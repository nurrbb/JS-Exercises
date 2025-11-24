const fs = require("fs");

// 1) CREATE 
const employee = { name: "Employee 1 Name", salary: 2000 };

fs.writeFile("employees.json", JSON.stringify(employee, null, 2), "utf8", (err) => {
  if (err) {
    console.log("Dosya oluşturulurken hata oluştu:", err);
    return;
  }
  console.log("1) CREATE: employees.json oluşturuldu ve veri yazıldı.");

  // 2) READ –
  fs.readFile("employees.json", "utf8", (err, data) => {
    if (err) {
      console.log("Dosya okunurken hata oluştu:", err);
      return;
    }
    console.log("2) READ: Dosya içeriği:");
    console.log(data);

    // 3) UPDATE 
    const updatedEmployee = { name: "Employee 1 Updated", salary: 3000 };

    fs.writeFile("employees.json", JSON.stringify(updatedEmployee, null, 2), "utf8", (err) => {
      if (err) {
        console.log("Dosya güncellenirken hata oluştu:", err);
        return;
      }
      console.log("3) UPDATE: employees.json içeriği güncellendi.");

      //  DELETE 
      fs.unlink("employees.json", (err) => {
        if (err) {
          console.log("Dosya silinirken hata oluştu:", err);
          return;
        }
        console.log("4) DELETE: employees.json silindi.");
      });
    });
  });
});
