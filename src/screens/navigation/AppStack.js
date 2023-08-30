import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyInfo from '../MyInfo';
import Repos from '../Repos';
import PagInicio from '../PagInicio';
import CustomDrawer from '../../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TabNavigator from './TabNavigation';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: 'grey',
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'black',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Louis-George-Cafe',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        component={Repos}
        name="Repos"
        options={{ 
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        //component={TabNavigator}
        component={MyInfo}
        name="MyInfo"
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={PagInicio}
        name="PagInicio"
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
