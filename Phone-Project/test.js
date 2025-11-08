// test.js
const phoneSimulator = require('./phoneSimulator');


// Küçük yardımcı: beklenen–gerçek karşılaştırması
function assertEqual(actual, expected, description) {
  if (actual === expected) {
    console.log(`✅ ${description} | Sonuç: ${actual}`);
  } else {
    console.log(`❌ ${description} | Beklenen: ${expected} | Gelen: ${actual}`);
  }
}

// Her seferinde sıfırdan telefon oluşturmak için fonksiyon
function createPhone(storage = 64, price = 10000) {
  // brand, model, capacity, storage, price, battery
  return phoneSimulator('Apple', 'iPhone 13', 128, storage, price, 100);
}

// 1) Başlangıç değerleri testi
console.log('\n=== TEST 1: Başlangıç durumu ===');
{
  const phone = createPhone();
  assertEqual(phone.brand, 'Apple', 'Marka doğru mu?');
  assertEqual(phone.model, 'iPhone 13', 'Model doğru mu?');
  assertEqual(phone.capacity, 128, 'Toplam kapasite doğru mu?');
  assertEqual(phone.storage, 64, 'Başlangıç boş hafıza doğru mu?');
  assertEqual(phone.battery, 100, 'Başlangıç batarya %100 mü?');

  console.log('getInfo çıktısı:');
  console.log('  ', phone.getInfo());
}

// 2) Yeterli hafızayla uygulama yükleme
console.log('\n=== TEST 2: installApp - yeterli hafıza ===');
{
  const phone = createPhone(64);
  const msg = phone.installApp('Instagram', 10);

  console.log('Dönen mesaj:', msg);
  assertEqual(phone.storage, 54, 'Instagram yüklenince storage 64 -> 54 oldu mu?');
}

// 3) Yetersiz hafızayla uygulama yükleme (BURADA SENİN KODUN BUG GÖSTEREBİLİR 🙂)
console.log('\n=== TEST 3: installApp - YETERSİZ hafıza ===');
{
  const phone = createPhone(5); // sadece 5 GB boş
  const before = phone.storage;
  const msg = phone.installApp('HugeGame', 50); // 50 GB istiyor

  console.log('Dönen mesaj:', msg);
  console.log('Önceki storage:', before, ' | Sonraki storage:', phone.storage);

  // Burada BEKLENEN mantık:
  // - mesaj "yetersiz hafıza" olmalı
  // - storage DEĞİŞMEMELİ (5 kalmalı)
  // Şu an senin if koşulun yanlış olduğu için muhtemelen bu test FAIL verecek.
  assertEqual(
    phone.storage,
    before,
    'Yetersiz hafızada storage değişmemeli (senin kodunda bunu özellikle kontrol ediyoruz)'
  );
}

// 4) deleteApp - normal silme senaryosu
console.log('\n=== TEST 4: deleteApp - geçerli silme ===');
{
  const phone = createPhone(60); // 60 boş hafıza
  // Farz edelim 10 GB'lık bir uygulama var ve siliyoruz:
  const msg = phone.deleteApp('Instagram', 10);

  console.log('Dönen mesaj:', msg);
  console.log('Sonraki storage:', phone.storage);

  // Mantıken 60 + 10 = 70 olmalı
  // Ama senin kodunda if içinde "this.storage += size" kullandığın için
  // hem koşulda artırıyorsun hem else’de tekrar artırıyorsun: bu da bug.
  assertEqual(
    phone.storage,
    70,
    '10 GB uygulama silinince boş hafıza 60 -> 70 olmalı (bug var mı bakıyoruz)'
  );
}

// 5) deleteApp - kapasiteyi aşma senaryosu
console.log('\n=== TEST 5: deleteApp - kapasiteyi aşmaya çalışma ===');
{
  const phone = createPhone(120); // 128 kapasite, 120 boş hafıza
  const before = phone.storage;
  const msg = phone.deleteApp('UnknownApp', 20); // 20 GB daha eklemeye çalışıyoruz

  console.log('Dönen mesaj:', msg);
  console.log('Önceki storage:', before, ' | Sonraki storage:', phone.storage);

  // Beklenen mantık:
  // 120 + 20 > 128 olduğu için:
  // - "uygulama yüklü değil" demeli
  // - storage DEĞİŞMEMELİ
  assertEqual(
    phone.storage,
    before,
    'Kapasiteyi aşan silme girişiminde storage aynı kalmalı'
  );
}

// 6) phoneUse - normal kullanım
console.log('\n=== TEST 6: phoneUse - normal kullanım ===');
{
  const phone = createPhone(64, 10000);
  const msg = phone.phoneUse(3); // 3 saat kullan

  console.log('Dönen mesaj:', msg);
  console.log('Sonraki battery:', phone.battery);
  console.log('Sonraki price:', phone.price);

  // 3 saat -> batarya 100 - 30 = 70
  // fiyat 10000 - (3 * 50) = 9850
  assertEqual(phone.battery, 70, '3 saat kullanım sonrası batarya 70 olmalı');
  assertEqual(phone.price, 9850, '3 saat kullanım sonrası fiyat 9850 olmalı');
}

// 7) phoneUse - bataryanın 0 altına düşmemesi
console.log('\n=== TEST 7: phoneUse - batarya asla 0 altına düşmemeli ===');
{
  const phone = createPhone(64, 10000);
  const msg = phone.phoneUse(15); // 15 saat → 150% düşürmeye çalışıyoruz

  console.log('Dönen mesaj:', msg);
  console.log('Sonraki battery:', phone.battery);

  assertEqual(phone.battery, 0, 'Uzun kullanımda batarya 0 olmalı, negatif değil');
}

// 8) charge - normal şarj
console.log('\n=== TEST 8: charge - normal şarj ===');
{
  const phone = createPhone();
  phone.phoneUse(3); // önce biraz kullanalım: batarya 70
  const msg = phone.charge(20); // +20 → 90

  console.log('Dönen mesaj:', msg);
  console.log('Sonraki battery:', phone.battery);

  assertEqual(phone.battery, 90, '70 + 20 = 90 olmalı');
}

// 9) charge - 100 üstüne çıkmamalı
console.log('\n=== TEST 9: charge - 100 üstü engellenmeli ===');
{
  const phone = createPhone();
  const msg = phone.charge(50); // 100 + 50 → 100 olarak kalmalı

  console.log('Dönen mesaj:', msg);
  console.log('Sonraki battery:', phone.battery);

  assertEqual(phone.battery, 100, 'Batarya %100 üstüne çıkmamalı');
}

// 10) getPrice
console.log('\n=== TEST 10: getPrice ===');
{
  const phone = createPhone(64, 12345);
  console.log('getPrice çıktısı:', phone.getPrice());
}
