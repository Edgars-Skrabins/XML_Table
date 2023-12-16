import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {PaymentRowProps} from "../payments";

const Paymentrow = ({SerNr, ClientContact}: PaymentRowProps) => {
    return (
        <View style={styles.table}>
            <View style={styles.row}>
                <View style={styles.cell}>
                    <Text style={styles.name}>
                        {ClientContact}
                    </Text>
                </View>

                <View style={styles.cell}>
                    <Text style={styles.serNr}>
                        {SerNr}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Paymentrow;

const styles = StyleSheet.create({
    table: {
        borderWidth: 1,
        borderColor: "black",
        marginBottom: 5,
        marginTop: 2,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#e3e3e3",
    },
    cell: {
        flex: 1,
        padding: 10,
        borderWidth: .5,
        width: 500,
        height: 50,
        textAlign: "center",
        fontSize: 25,
        color: "black",
        borderColor: "black",
    },

    name: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },

    serNr: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
