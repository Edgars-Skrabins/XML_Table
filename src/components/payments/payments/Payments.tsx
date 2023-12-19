import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {parseString} from 'xml2js';
import PaymentRow from "../paymentRow/PaymentRow";
import PaymentHeader from "../paymentHeader/PaymentHeader";
import {api} from "../../../utils/api/api";

type PaymentData = {
    data: {
        $: {
            register: string;
            sequence: string;
            systemversion: string;
        };
        IVVc: PaymentEntry[];
    };
};

type PaymentEntry = {
    SerNr: string[];
    ClientContact: string[];
};

const paymentURL = '/IVVc';
const Payments = () => {

    const [loading, setLoading] = useState(false);
    const [paymentsEntries, setPaymentsEntries] = useState<PaymentEntry[]>([]);

    const getPayments = async () => {

        setLoading(true);

        const {data} = await api.get(paymentURL);

        parseString(data, (err, result: PaymentData) => {
            if (err) {
                console.error('Failed to parse XML to JSON: ', err);
                return;
            }
            setPaymentsEntries(result.data.IVVc);
            console.log('Successfully parsed XML to JSON: ', result);

            setLoading(false);

        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    onPress={getPayments}
                    style={styles.readPaymentsBtn}
                >
                    <Text
                        style={styles.readPaymentsBtnText}
                    >
                        Nolasīt rēķinus
                    </Text>
                </Pressable>

                <PaymentHeader/>

            </View>

            {loading && <Text> loading... </Text>}
            {paymentsEntries.map(({ClientContact, SerNr}) => {
                return (
                    <PaymentRow
                        key={SerNr[0]}
                        ClientContact={ClientContact[0] || '-'}
                        SerNr={SerNr[0] || '-'}/>
                );
            })}
        </View>
    );
};

export default Payments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        textAlign: 'center',
    },

    header: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        top: 0,
        width: '100%',
    },

    readPaymentsBtn: {
        backgroundColor: '#8d8d8d',
        fontWeight: 'bold',
        borderRadius: 5,
        padding: 10,
        fontSize: 20,
        margin: 20,
    },

    readPaymentsBtnText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
});
