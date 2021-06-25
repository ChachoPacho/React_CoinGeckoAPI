import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';

import CoinItem from './components/CoinItem';

export default function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [refresh, setrefresh] = useState(false)

  const loadData = async () => {
    const resCG = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
    const dataCG = await resCG.json();
    setCoins(dataCG);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.homeHeader}>
        <Text style={styles.headerTitle}>CoinCatcher</Text>
        <TextInput 
          style={styles.headerSearch}
          placeholder=" Search"
          onChangeText={(text) => setSearch(text.toLowerCase())}
        />
      </View>
      <FlatList 
        style={styles.homeListCoin}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshing={refresh}
        onRefresh={async () => {
          setrefresh(true);
          await loadData();
          setrefresh(false);
        }}
        data={
          coins.filter(
            (coin) => coin.name.toLowerCase().includes(search)
            || coin.symbol.toLowerCase().includes(search)
            )
        }
        renderItem={({item}) => {
          console.log(item);
          return <CoinItem coin={item} ></CoinItem>
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeHeader: {
    paddingTop: 30,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    width: "100%",
    backgroundColor: "#1616",
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: "600",
    marginLeft: "5%",
  },
  headerSearch: {
    borderBottomWidth: 1,
    borderColor: 'black',
    width: "40%",
    marginLeft: "auto",
    marginVertical: 5,
  },
  homeListCoin: {
    width: "100%",
    paddingHorizontal: "5%",
  }
});
