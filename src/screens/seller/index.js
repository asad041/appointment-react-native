import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getSeller} from '../../store/actions';
import Colors from '../../constants/color';
import ItemTile from '../../components/ui/ItemTile';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Seller = ({navigation}) => {
  const id = navigation.state.params.id;
  const dispatch = useDispatch();
  const {loading, seller} = useSelector(state => state.seller);

  useEffect(() => {
    dispatch(getSeller(id));
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.text}>Details</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : seller === null ? (
        <Text>Not found information...</Text>
      ) : (
        <>
          <ItemTile
            title={seller.slot.user.name}
            subTitle={seller.slot.user.email}
          />
          <ItemTile title="Other info" subTitle={seller.slot.description} />
          <View style={styles.infoContainer}>
            <View style={styles.body}>
              <Text style={styles.title}>Total Slots</Text>
              <Text style={styles.subTitle}>{seller.slot.total}</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.title}>Avail Slots</Text>
              <Text style={styles.subTitle}>
                {seller.slot.total - seller.accepted}
              </Text>
            </View>
          </View>

          <View style={styles.slotContainer}>
            <View style={styles.slotHeader}>
              <Text style={styles.slotTitle}>AVAILABLE SLOTS</Text>
            </View>
            <View style={styles.slotBody}>
              <TouchableOpacity style={styles.slotTile}>
                <Text>Slot No. 01, 11:00 AM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
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
    flexDirection: 'row',
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  body: {
    width: '45%',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: Colors.border,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontSize: 17,
    color: Colors.blur,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  text: {
    color: Colors.blur,
  },
  slotContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    shadowColor: Colors.border,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.border,
  },
  slotHeader: {
    marginBottom: 15,
    width: '100%',
  },
  slotBody: {},
  slotTitle: {
    fontWeight: '700',
    fontSize: 12,
    color: Colors.blur,
  },
  slotTile: {
    width: '50%',
    padding: 13,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 5,
  },
});

export default Seller;
