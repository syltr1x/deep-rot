import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Alert } from 'react-native';
import React from "react";
// Views
import HomeView from "../views/HomeView";
import WorkView from "../views/WorkView";
import ChatView from "../views/ChatView";
import NewsView from "../views/NewsView"
import UserView from "../views/UserView"

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions = { ({ route }) => ({
                tabBarActiveTintColor: '#dfdfdf',
                tabBarActiveBackgroundColor: '#111',
                tabBarInactiveTintColor: '#b1b1b1',
                tabBarInactiveBackgroundColor: '#111',
                tabBarShowLabel: false,
                headerTitleAlign: "center",
                headerShown:false,
                tabBarIcon: ({ focused, color, size }) => {
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
                        case 'News':
                            iconName = focused ? 'newspaper' : 'newspaper-outline';
                            break;
                        case 'User':
                            iconName = focused ? 'person-circle' : 'person-circle-outline';
                            break;
                    }
                    return <Icon name = { iconName } size = { size } color = { color } />
                }
            })}
        >
            <Tab.Screen name="Home" component={ HomeView }/>
            <Tab.Screen name="Works" component={ WorkView }/>
            <Tab.Screen name="Chat" component={ ChatView } />
            <Tab.Screen name="News" component={ NewsView } />
            <Tab.Screen name="User" component={ UserView } />
        </Tab.Navigator>
    )
}
export default BottomTab