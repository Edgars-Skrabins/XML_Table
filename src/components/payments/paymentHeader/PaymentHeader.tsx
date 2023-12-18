import {StyleSheet, Text, View,Dimensions} from "react-native";

const PaymentHeader = () => {

    return (
        <View style={styles.rowContainer}>
            <View style={styles.row}>
                <View style={styles.cell}>
                    <Text style={styles.name}>
                        Client Name
                    </Text>
                </View>

                <View style={styles.cell}>
                    <Text style={styles.serNr}>
                        Ser Nr.
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default PaymentHeader;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

    rowContainer: {
        borderColor: "black",
        maxWidth: width,
        padding: 4,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#a2a2a2",
        borderWidth: 1,
    },
    cell: {
        flex: 1,
        borderWidth: .5,
        width: 500,
        height: 40,
        textAlign: "center",
        fontSize: 25,
        color: "black",
        borderColor: "black",

        paddingLeft: 5,

        alignItems:'center',
        justifyContent:'center'
    },

    name: {
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },

    serNr: {
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
