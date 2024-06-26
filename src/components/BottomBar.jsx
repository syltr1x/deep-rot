import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import React from "react";
// Views
import HomeView from "../views/HomeView";
import WorkView from "../views/WorkView";
import ServerFrame from "../views/ServersView";
import UsersFrame from "../views/UserView"

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions = { ({ route }) => ({
                tabBarStyle:{backgroundColor:'#111', borderColor: '#4448'},
                tabBarActiveTintColor: '#dfdfdf',
                tabBarActiveBackgroundColor: '#111',
                tabBarInactiveTintColor: '#b1b1b1',
                tabBarInactiveBackgroundColor: '#111',
                tabBarShowLabel: false,
                headerTitleAlign: "center",
                headerShown:false,
                tabBarIcon: ({ focused, color }) => {
                    let iconName = '';
                    switch ( route.name ) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Works':
                            iconName = focused ? 'build' : 'build-outline';
                            break;
                        case 'Chat':
                            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                            break;
                        case 'User':
                            iconName = focused ? 'person-circle' : 'person-circle-outline';
                            break;
                    }
                    return <Icon name = { iconName } size = { 32 } color = { color } />
                }
            })}
        >
            <Tab.Screen name="Home" component={ HomeView }/>
            <Tab.Screen name="Works" component={ WorkView }/>
            <Tab.Screen name="Chat" component={ ServerFrame } />
            <Tab.Screen name="User" component={ UsersFrame } />
        </Tab.Navigator>
    )
}
export default BottomTab