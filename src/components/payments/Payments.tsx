import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import axiosConfig from '../axiosConfig/AxiosConfig';
import {parseString} from 'xml2js';
import PaymentRow from "./paymentRow/PaymentRow";
import PaymentHeader from "./paymentHeader/PaymentHeader";

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

const nameWhenClientNameNotFound = 'Nav';

const paymentURL = '/IVVc';
const currentUser = 'TEST';
const currentPassword = '123123123';
const Payments = () => {

    const [paymentsData, setPaymentsData] = useState<PaymentData>();

    const getPayments = () => {
        axiosConfig.get(paymentURL)
            .then(({data}) => {
                parseString(data, (err, result) => {
                    if (err) {
                        console.error('Failed to parse XML to JSON: ', err);
                    } else {
                        const paymentsResponse: PaymentData = result;
                        setPaymentsData(paymentsResponse);

                        console.log('Successfully parsed XML to JSON: ');
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


            {paymentsData?.data.IVVc.map(({ClientContact, SerNr}) => {

                return (
                    <PaymentRow
                        key={SerNr[0]}
                        ClientContact={ClientContact[0] || nameWhenClientNameNotFound}
                        SerNr={SerNr[0] || nameWhenClientNameNotFound}/>
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
