import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getAppointments} from '../../store/actions';
import Colors from '../../constants/color';
import AppointTile from '../../components/ui/AppointTile';

const AppointmentList = () => {
  const dispatch = useDispatch();
  const {loading, appointments} = useSelector(state => state.appointment);

  useEffect(() => {
    dispatch(getAppointments());
  }, []);

  const renderItem = ({item}) => {
    return (
      <AppointTile
        status={item.status}
        seller={item.seller}
        date={item.date}
        onPress={() => {}}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.text}>Appointments</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        appointments.length > 0 && (
          <FlatList
            keyExtractor={item => item._id}
            data={appointments}
            renderItem={item => renderItem(item)}
            numColumns={1}
            initialNumToRender={0}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 5,
  },
  container: {
    width: '96%',
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  text: {
    color: Colors.blur,
    // fontSize: 11,
  },
});

export default AppointmentList;
