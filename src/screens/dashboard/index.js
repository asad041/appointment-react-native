import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getSellers, setSellerLoading} from '../../store/actions';
import Colors from '../../constants/color';
import ItemTile from '../../components/ui/ItemTile';

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const seller = useSelector(state => state.seller);
  const {loading, sellers} = seller;

  useEffect(() => {
    dispatch(getSellers());
  }, []);

  const sellerHandler = id => {
    dispatch(setSellerLoading(true));
    navigation.navigate({
      routeName: 'Seller',
      params: {
        id,
      },
    });
  };

  const renderItem = ({item}) => {
    return (
      <ItemTile
        title={item.user.name}
        subTitle={item.user.email}
        onPress={() => sellerHandler(item.user._id)}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.text}>Sellers list</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          keyExtractor={item => item._id}
          data={sellers}
          renderItem={item => renderItem(item)}
          numColumns={1}
          initialNumToRender={0}
        />
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
    width: '100%',
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 5,
  },
  text: {
    color: Colors.blur,
    // fontSize: 11,
  },
});

export default Dashboard;
