function phoneSimulator(brand, model, capacity, storage, price, battery){

    
    let simulator ={
        brand: brand,
        model: model,
        capacity: capacity,
        storage:storage,
        price: price,
        battery:100
    }

    simulator.getInfo = function(){
        return this.brand + ' '+ this.model  + ' , Price : ' + this.price + ', Battery: ' + this.battery + ' sCapacity: ' + this.capacity
    };

    simulator.installApp = function(appName, size){

        if(this.storage  < size){
            return 'Unfortunately, your phone doesn’t have enough storage to install this application. '
        }
        else{
            this.storage -= size
            return this.appName + ' successfully installed. Remaining storage: ' + this.storage
        }
    }

    simulator.deleteApp = function(appName, size){
        if(this.storage +size > this.capacity){
            return 'The application you’re trying to delete is not installed on your phone'
        }
        else{
            this.storage += size
            return 'The application was successfully deleted. Current storage: ' + this.storage
        }
    }

    simulator.phoneUse = function(hour){

        this.battery -= (hour * 10) 

        if(this.battery < 0 ){
            this.battery = 0
        }

        this.price -= hour*50

        if(this.price <0){
            this.price = 0
        }
        return 'The phone has been used for ' + hour + 'hours. Current battery: %' +this.battery
    }

    simulator.charge = function(percent){
        this.battery += percent
        if(this.battery > 100){
            this.battery = 100
        }
        return 'The phone has been charged. Battery: %' + this.battery
    }

    simulator.getPrice = function(){
        return 'The current market value of the phone is ' + this.price
    }
    
    return simulator;

}
module.exports = phoneSimulator;
