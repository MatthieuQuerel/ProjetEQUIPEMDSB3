import {Component, ReactNode}  from 'react';
import { View, Text, TextInput, Button ,TouchableOpacity,StyleSheet,Alert} from 'react-native';
import { Link } from 'react-router-native';


interface NavBarState {
  
}
interface IProps {
}
const NavBar: React.FC<IProps> = () => {
  
        return(
            <View>
              <nav className="navbar-container">
                <Link to="/">
                         Home
                 </Link>
                 <Link to="/about">About</Link>
                 <Link to="/contact">Contact</Link>
               </nav>
            </View>

        )
  
}
export default NavBar ;