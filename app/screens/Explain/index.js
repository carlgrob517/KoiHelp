import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, ScrollView, TouchableOpacity, TextInput , BackHandler, ToastAndroid} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";

class Explain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",      
      loading: false,
      success: {
        content: true        
      }
    };
  }

  

  send() {
    const { content, success } = this.state;
    const { navigation } = this.props;
    const { dispatch } = this.props;
    
    if (content == "") {
      this.setState({
        success: {
          ...success,
          content: false          
        }
      });
    } else {
      this.setState(
        {
          loading: true
        },
        () => {
          
                   
          this.setState({ loading: false });          
          ToastAndroid.showWithGravity(
            'Sent successfully',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );

          navigation.goBack();
                                             
        }
      );
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title=""
          renderLeft={() => {
            return (
              <Icon
                style={{marginTop:20}}
                name="arrow-left"
                size={20}
                color={BaseColor.primaryColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();            
          }}
        />
        <ScrollView>
          <View style={styles.contain}>

  

            <View style={{marginTop:10, width:"100%"}}>
              <Text title2 semibold  numberOfLines={1}  style={{marginTop:0,marginLeft:5, marginBottom:5, fontFamily:'Raleway-SemiBold' }} >
                Explain
              </Text>                                     
            </View>



            <View>
              <Text grayColor Raleway numberOfLines={1}  style={{marginTop:20,marginLeft:5, marginBottom:5}} >
                Issue
              </Text>
            </View>
            

            <TextInput
              style={[BaseStyle.textInput, { marginTop: 0, height:150 }]}
              onChangeText={text => this.setState({ content: text })}
              multiline
              numberOfLines={4}
              onFocus={() => {
                this.setState({
                  success: {
                    ...this.state.success,
                    content: true
                  }
                });
              }} 
              autoCorrect={false}
              placeholder=""
              placeholderTextColor={
                this.state.success.content
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }              
              value={this.state.content}
              selectionColor={BaseColor.primaryColor}
            />
                         
            <View style={{ width:'100%', justifyContent:'center', alignItems:'center' }}>
              <Button
                full
                loading={this.state.loading}
                style={{ marginTop: 20, width:150, height:46 }}
                onPress={() => {
                  this.send();
                }}
              >
                SEND
              </Button>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text body1 grayColor style={{ marginTop: 25 }}>
                {/* Create a new user  */}
                {/* Forgot your password? */}                
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Explain);
