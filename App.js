import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';

export default function App() {
  const [show, setShow] = useState(false);
  const [link, setLink] = useState('');
  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [repoLength, setRepoLength] = useState(1);

  const getGitHubData = async (link) => {
    try{
        let result = await fetch('https://api.github.com/users/' + link + '/repos')
        let repodata = await result.json()
        setData(repodata)
        setRepoLength(repodata.length)
    }catch(e){
      console.log(`error in getGitHubData: ${JSON.stringify(e)}`)
    }

  }

  const renderItem = ({item}) => {
    var n = item['html_url'].lastIndexOf('/');
    return (
      <View style={{flexDirection:'row', margin:20, padding:20, backgroundColor:'#d3d3d3'}}>
        <Text style={{flex:1,textAlign:'left', fontSize:20}}>{item['html_url'].substring(n+1)}</Text>
     </View>
  )}

  let repolist = <View></View>;
  
  let showRepo = "show repositories";
  
  if (show) {
    showRepo = "hide repositories";
    
    if (data.message != "Not Found") {
      repolist = <FlatList
                  data={data.slice(0)}
                  renderItem={renderItem}
                  keyExtractor={item => item.created_at}
                />;
      
    }
  } else {
    repolist = <View style={{flexDirection:'row', padding:20, margin:20,backgroundColor:'#d3d3d3', alignItems:"center"}}>
        <Text style={{flex:1,textAlign:'left', fontSize:20}}>None</Text>
     </View>
  }

  useEffect(() => {
    getGitHubData(link)
  }, [link]);

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: "#000000", alignItems:"center", justifyContent: 'center', minHeight: 60}}>
        <Text style={{color: "#8B0000", fontSize:30}}>Github Viewer</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems:"center", justifyContent: 'center'}}>
          <Text style={{fontSize:30}}>github Id:</Text>
          <TextInput style={{fontSize:30}} onChangeText={text => {setText(text);}}
            onSubmitEditing={() =>{setLink(text);}} 
            //onChangeText = {text => {setRadiusInput(text)}}
          />
      </View>
      <View style={{alignItems:"center", justifyContent: 'center', right:80}}>
        <Text style={{color: "#0000FF", fontSize:30}} onPress={() => {
          setShow(!show)
        }}>  
          {showRepo}    
        </Text>
      </View>
      {repolist}
      <View style={{flexDirection:'column', marginTop:20, marginBottom:20, textAlign:'left'}}>
        <Text>DEBUGGING </Text>
        <Text>userId:{link}</Text>
        <Text>showReps:{show.toString()}</Text>
        <Text> repos.length = {repoLength}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent:  'flex-start',
  },
});
