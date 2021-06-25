import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function CoinItem({coin}) {
    return (
        <View style={styles.master}>
            <View style={styles.masterCoin}>
                <Image style={styles.coinImage} source={{uri: coin.image}}/>
                <View style={styles.coinName}>
                    <Text style={styles.nameFull}>{coin.name}</Text>
                    <Text style={styles.nameSymbol}>{coin.symbol}</Text>
                </View>
            </View>
            <View style={[styles.masterPrice]}>
                <Text style={styles.priceCurrent}>${coin.current_price}</Text>
                <Text style={[
                    styles.pricePercent24, 
                    coin.price_change_percentage_24h > 0 
                    ? styles.pricePercent24_Up 
                    : styles.pricePercent24_Down
                    ]}> 
                    {coin.price_change_percentage_24h}%
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    master: {
        paddingTop: 10,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    masterCoin: {
        flexDirection: "row",
        alignItems: "center",
    },
    coinImage: {
        width: 30,
        height: 30,
    },
    coinName: {
        paddingLeft: 10,
        flexDirection: "column",
    },
    nameSymbol: {
        fontStyle: "italic",
        color: "#171717",
        textAlignVertical: "center",
        textTransform: "uppercase"
    },
    nameFull: {
        color: "white",
        textAlign: "center",
        textAlignVertical: "center",
    },


    masterPrice: {
        flexDirection: "column",
    },
    priceCurrent: {
        color: "white",
        textAlign: "right",
        textAlignVertical: "center",
    },
    pricePercent24: {
        textAlign: "center",
        textAlignVertical: "center",
    },
    pricePercent24_Up: {
        color: "#00ee00",
    },
    pricePercent24_Down: {
        color: "#ee0000",
    }

})