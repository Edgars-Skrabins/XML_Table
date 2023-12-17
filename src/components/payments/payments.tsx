import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import {parseString} from 'xml2js';
import PaymentRow from "./paymentRow";
import PaymentHeader from "./paymentHeader";

export type PaymentRowProps = {
    SerNr: string;
    ClientContact: string;
}

const Payments = () => {

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

    const [paymentsResponse, setPaymentsResponse] = useState<PaymentData>();
    const [paymentEntry, setPaymentEntry] = useState<PaymentEntry[]>([]);

    const nameWhenClientNameNotFound = 'NAV';

    const paymentURL = 'https://lv001.excellent.lv:7002/api/1/IVVc';
    const currentUser = 'TEST';
    const currentPassword = '123123123';

    const getPayments = () => {
        const axiosParams = {
            auth: {
                username: currentUser,
                password: currentPassword,
            },
        };

        axios.get(paymentURL, axiosParams)
            .then((response) => {
                parseString(response.data, (err, result) => {
                    if (err) {
                        console.error('Failed to parse XML to JSON: ', err);
                    } else {
                        const paymentsResponse: PaymentData = result;
                        console.log('Successfully parsed XML to JSON: ');
                        setPaymentsResponse(paymentsResponse);
                        setPaymentEntry(paymentsResponse.data.IVVc)
                    }
                });
            })
            .catch((error) => {
                console.error(`Failed to get payment data with User:${currentUser} and Password:${currentPassword} ` + error);
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


            {paymentEntry.map((element) => {

                const name = element.ClientContact[0] === '' ? nameWhenClientNameNotFound : element.ClientContact[0];
                const serNr = element.SerNr[0];

                return (
                    <PaymentRow
                        key={element.SerNr[0]}
                        ClientContact={name}
                        SerNr={serNr}/>
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
