import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: "100%"
  },
  contain: {    
    padding: 20,
    width: "100%"
  },

  
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection:"row",
    alignItems: 'center',        
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,        
    
  },

  data: {   

    borderColor: '#888',    
    color: '#777'
  }

});
