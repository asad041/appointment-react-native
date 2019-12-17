import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/color';
import {searchSeller} from '../../store/actions';

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const {sellers, error} = useSelector(state => state.seller);
  const dispatch = useDispatch();

  const valueHandler = inputValue => {
    setValue(inputValue);
  };

  useEffect(() => {
    setLoading(false);
  }, [sellers, error]);

  const searchHandler = () => {
    setLoading(true);
    dispatch(searchSeller({name: value}));
  };

  return (
    <View style={styles.container}>
      <View>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Search..."
            returnKeyType="search"
            autoCapitalize="none"
            defaultValue=""
            maxLength={100}
            value={value}
            onChangeText={valueHandler}
            onSubmitEditing={searchHandler}
            clearButtonMode="while-editing"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});

export default Search;
