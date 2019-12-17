import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getSeller, addAppointment} from '../../store/actions';
import Colors from '../../constants/color';
import ItemTile from '../../components/ui/ItemTile';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DefaultButton from '../../components/ui/DefaultButton';

const Seller = ({navigation}) => {
  const id = navigation.state.params.id;
  const [slots, setSlots] = useState([]);
  const [book, setBook] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const {loading, seller} = useSelector(state => state.seller);
  const {appointments} = useSelector(state => state.appointment);

  useEffect(() => {
    dispatch(getSeller(id));
  }, []);

  useEffect(() => {
    if (seller !== null) {
      const len = seller.slot.total - seller.accepted;
      const updatedSlots = [];
      for (let i = 0; i < len; i++) {
        updatedSlots[i] = i;
      }
      setSlots(updatedSlots);
    }
  }, [seller]);

  useEffect(() => {
    if (!loading && seller !== null) {
      navigation.navigate({routeName: 'Dashboard'});
    }
  }, [appointments]);

  const bookingHandler = key => {
    setBook(key);
  };

  const submitHandler = () => {
    setSubmitting(true);
    dispatch(addAppointment({seller: seller.slot.user._id}));
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={
          item === book
            ? {...styles.slotTile, ...styles.bookTile}
            : styles.slotTile
        }
        onPress={() => bookingHandler(item)}>
        <Text style={item === book && styles.bookText}>
          Slot No. {item + 1}
        </Text>
      </TouchableOpacity>
    );
  };

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
              <FlatList
                keyExtractor={item => item}
                data={slots}
                renderItem={item => renderItem(item)}
                numColumns={1}
              />
            </View>
          </View>

          <View style={{...styles.slotContainer, ...{borderWidth: 0}}}>
            {book !== null &&
              (submitting ? (
                <ActivityIndicator size="small" />
              ) : (
                <DefaultButton
                  text="Book appointment"
                  onPress={submitHandler}
                />
              ))}
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
    marginHorizontal: 10,
    marginBottom: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
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
    height: 300,
  },
  slotHeader: {
    marginBottom: 15,
    width: '100%',
  },
  slotBody: {
    width: '100%',
  },
  slotTitle: {
    fontWeight: '700',
    fontSize: 12,
    color: Colors.blur,
  },
  slotTile: {
    width: '99%',
    flex: 0.5,
    padding: 13,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 5,
    marginVertical: 5,
  },
  bookTile: {
    backgroundColor: Colors.primary,
  },
  bookText: {
    color: Colors.white,
  },
});

export default Seller;
