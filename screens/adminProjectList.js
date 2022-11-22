
import React , {useState , useEffect, Component} from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView , Image , TouchableOpacity, Button, ScrollView, TextInput } from 'react-native';
import axios from "axios";
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function Projectlist({ route , navigation }) {

    const [name , setName] = useState(JSON.parse(route.params.a));

    const [data , setData] =  useState([]);
    const [assignTask , setAssignTask] = useState([]);
    // const [projectData , setProjectData] = useState([]);
    const [id, setId] = useState(data._id);
    
    const baseUrl = "http://10.0.2.2:3000";


    //1 time page
    //2nd time page
    useEffect(() => {
       
        getProjectList();
        // projectDetails();
    });

  
  
//      const getProjectList = () => {
      
//       axios.get('http://localhost:3000/projects')
//       .then(function(response) {
//         // alert(JSON.stringify(response.data));
        
//         setData(response.data);
       
  
//         console.log(data);
  
//       })
//       .catch(error => {
//         alert(error);
//       });
//   }

//   const projectDetails = () =>{
//    var a = [];
//     data.forEach((element) => {
//             // alert(data[0]._id);
//         console.log(element.assignedMember);
//        if(element.assignedMember == name){
//             a.push(element);
//             console.log(a);

//        }

      
        
//        setAssignTask(a);
   
//   });
// }

const funcDelete = (id) => {
    alert(id);
}

const handleDelete= async (id) => {
    try{
   const response = await axios.delete(`${baseUrl}/projects/${id}`);
   if (response.status === 200) {
    alert(` You have deleted: ${JSON.stringify(response.data)}`);    
    getProjectList();
    } else {
    throw new Error("An error has occurred adding data");
  }
}
    catch(e) {
        console.log(e);
    }
  }
  
  

const getProjectList = () => {
      
  axios.get(`${baseUrl}/projects`)
  .then(function(response) {
    // alert(JSON.stringify(response.data));
    
    // setProjectData(response.data);
    setData(response.data);
    console.log(data);

  })
  .catch(error => {
    alert(error);
  });
}


const itemSeparator = () => {
    return <View style = {styles.separator} />
   }


  return (
         
    <SafeAreaView>
        
        {/* <Button title='get Data'
        onPress={()=>projectDetails()}/> */}
  
    <ScrollView style={styles.scrollView}>
    
    <FlatList
    data = {data}
    ItemSeparatorComponent = { itemSeparator }

    renderItem = { ( {item , index} ) => (
        <TouchableOpacity onPress= {()=>navigation.navigate("ProjectInfo" , {info:JSON.stringify(item)})} >
        
          <Swipeable renderLeftActions={() => 
        
          <TouchableOpacity onPress={ () => handleDelete(item._id)} >
            <View style={styles.deletebox}>
              <Text style={styles.delete}>Delete</Text>
            </View>
          </TouchableOpacity>
        } >

            <View style={styles.item}>
                <View style={styles.avatarContainer} >
                   <Image style={styles.imagestyle} source = {require('../assets/5956592.png')} />
                </View>
                <Text style={styles.itemname}>{item.taskName}</Text>
            </View>
          </Swipeable>
        </TouchableOpacity>
    )}
      
    />
    </ScrollView>  
</SafeAreaView>

);
}


// style part start herer //
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    separator:{
      height: 1,
      width: '100%',
      backgroundColor: '#CCC',
  
    },
    item: {
      flex: 1,
      flexDirection:'row',
      alignItems: 'center',
      paddingVertical: 13,
    },
    avatarContainer:{
      backgroundColor: '#D9D9D9',
      borderRadius: 100,
      height:59,
      width:59,
      justifyContent:'center',
      alignItems:'center',
      marginLeft:20,
    },
    avatar:{
      height: 55,
      width: 55,
    },
    itemname:{
      fontWeight:'600',
      fontSize:16,
      marginLeft:13,
  },

    deletebox:{
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:"center",
        width:100,
        height:120,
    },

    delete:{
      fontSize:20,
      paddingBottom:25,
    },

    input:{height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },

    item1: {
      backgroundColor:'#ADD8E6',
      borderRadius:'5',
      margin:10,
    },

    i: {
      
      width:'100%',
      height:20,
      textAlign:'center',
      marginTop:10,
      fontSize:18,
      
    },

    imagestyle:{
      width:40,
      height:40,
    },
  
  });