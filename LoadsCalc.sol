pragma solidity ^0.6.9;
pragma experimental ABIEncoderV2;


contract LoadsCalc{
    
    struct Appliance{
        string name;
        uint load;
    }
    
    struct AppQty{
        
        string name;
        uint qty;
        
    }
    
   Appliance[] appliances;
    

    constructor() public{
        
        appliances.push(Appliance('Electric Stove', 2500));
        appliances.push(Appliance('Microwave',2500));
        appliances.push(Appliance('Boiler', 2500));
        appliances.push(Appliance('Electric Heater 30-50 liters', 2500));
        appliances.push(Appliance('Electric Heater 10-25 liters', 1500));
        appliances.push(Appliance('Dishwasher', 2000));
        appliances.push(Appliance('Mini Dishwasher', 1000));
        appliances.push(Appliance('Full Automatic Washing Machine', 2500));
        appliances.push(Appliance('Half Automatic Washing Machine', 1250));
        appliances.push(Appliance('Fan', 500));
        appliances.push(Appliance('Refrigerator +14 feet', 2000));
        appliances.push(Appliance('Refrigerator 12-14 feet', 1500));
        appliances.push(Appliance('Refrigerator 8-10 feet', 1000));
        
    }
    
    modifier appsLength(AppQty[] memory _appliances){
        require(_appliances.length > 0);
        _;
    }
    
    modifier checkApp(string memory _name, uint _load){
        require (keccak256(abi.encodePacked(_name)) !="" && _load > 0);
        _;
    }
    
    
    function getAppLoad(string memory _appliance, uint _qty) private view returns(uint){
        
        for(uint i=0; i<appliances.length; i++){
            

            if(keccak256(abi.encodePacked(appliances[i].name))  == keccak256(abi.encodePacked(_appliance))){
                
                return appliances[i].load * _qty;
                
            }
        }
        
        return 0;
    }
    
    function getAppNames() external view returns(string[] memory){
        
        string[] memory appNames = new string[](appliances.length);
        
        for(uint i=0; i<appliances.length; i++){
            
            appNames[i] = appliances[i].name;
            
        }
        
        return appNames;
    }
    
    function calcAppLoads(AppQty[] memory _appliances) appsLength(_appliances) public view returns(uint){
            
             uint totalLoads = 0;
        
        for(uint i=0; i< _appliances.length; i++){
            
            if(keccak256(abi.encodePacked( _appliances[i].name)) != "" &&  _appliances[i].qty > 0 ){
                
            }
            
          
            totalLoads += getAppLoad( _appliances[i].name,  _appliances[i].qty);
        }
        
        return totalLoads;
        
    }
    
  
    function addAppliance(string memory _name, uint _load) checkApp(_name, _load) public returns(bool){
        
        appliances.push(Appliance(_name, _load));
        
        return true;
    }
   
}
