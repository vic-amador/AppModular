import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawer from '../../components/CustomDrawer';
import Onboarding from '../Onboarding';
import Login from '../Login';
import MyInfo from '../MyInfo';
import Repos from '../Repos';
import Chat from '../Chat';
import Restor from '../RestoreAcc'
import TabNavigator from './TabNavigation';
import CreateAcc from '../CreateAcc';
import News from '../News';

const MainStack = createNativeStackNavigator();

function MainStackNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        component={Onboarding}
        name="Onboarding"
        options={{headerShown: false}}
      />
      <MainStack.Screen
        component={Login}
        name="Login"
        options={{headerShown: false}}
      />
      <MainStack.Screen
        component={Restor}
        name="Restor"
        options={{headerShown: false}}
      />
      <MainStack.Screen
        component={CreateAcc}
        name="CreateAcc"
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function AuthStack() {
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
        component={MainStackNavigator}
        name="Welcome"
        options={{
          swipeEnabled: false,
          drawerItemStyle: {
            display: 'none',
          },
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={TabNavigator}
        name="Inicio"
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={Repos}
        name="Reportes"
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="ios-notifications-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={MyInfo}
        name="Configuración"
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
