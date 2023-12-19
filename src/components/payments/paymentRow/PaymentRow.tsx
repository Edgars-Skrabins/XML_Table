import {StyleSheet, Text, View, Dimensions} from "react-native";

export type PaymentRowProps = {
    SerNr: string;
    ClientContact: string;
}

const PaymentRow = ({SerNr, ClientContact}: PaymentRowProps) => {
    return (
        <View style={styles.rowContainer}>
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

export default PaymentRow;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    rowContainer: {
        borderColor: "black",
        maxWidth:width,
        padding: 4,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#e3e3e3",
    },
    cell: {
        flex: 1,
        borderWidth: .5,
        width: 500,
        height: 50,
        textAlign: "center",
        fontSize: 25,
        color: "black",
        borderColor: "black",
        paddingLeft: 5,
        alignItems:'flex-start',
        justifyContent:'center'
    },

    name: {
        fontSize: 15,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },

    serNr: {
        fontSize: 15,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
