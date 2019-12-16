import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getSellers} from '../../store/actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const seller = useSelector(state => state.seller);
  const {loading, sellers} = seller;

  useEffect(() => {
    dispatch(getSellers());
  }, []);

  return (
    <View>
      <Text>List of Sellers</Text>
      {loading ? <ActivityIndicator size="large" /> : <Text>Data found</Text>}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Dashboard;

// const mapStateToProps

// export default connect()(Dashboard);
