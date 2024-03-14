import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';


const PaymentScreen = () => {
    const [amount, setAmount] = useState('');
    const [bankCode, setBankCode] = useState('');
    const [language, setLanguage] = useState('vn'); // Mặc định là tiếng Việt

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://birthday-backend-8sh5.onrender.com/api/v1/payment/create_payment_url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    total: amount,
                    bankCode: bankCode,
                    language: language
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to send payment request');
            }
    
            const responseData = await response.json();
            console.log('Response from API:', responseData);
            Alert.alert('Success', 'Payment request successful.');
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to process payment. Please try again later.');
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thanh toán</Text>
            <View style={styles.formGroup}>
                <Text>Số tiền</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Số tiền"
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>
            <View style={styles.formGroup}>
                <Text>Chọn Phương thức thanh toán:</Text>
                <View style={styles.radioGroup}>
                    <Text>VNPAYQR</Text>
                    <Button
                        title="Chọn"
                        onPress={() => setBankCode('VNPAYQR')}
                        disabled={bankCode === 'VNPAYQR'}
                    />
                </View>
                <View style={styles.radioGroup}>
                    <Text>Thanh toán qua ứng dụng hỗ trợ VNPAYQR</Text>
                    <Button
                        title="Chọn"
                        onPress={() => setBankCode('VNPAYQR')}
                        disabled={bankCode === 'VNPAYQR'}
                    />
                </View>
                <View style={styles.radioGroup}>
                    <Text>Thanh toán qua ATM-Tài khoản ngân hàng nội địa</Text>
                    <Button
                        title="Chọn"
                        onPress={() => setBankCode('VNBANK')}
                        disabled={bankCode === 'VNBANK'}
                    />
                </View>
                <View style={styles.radioGroup}>
                    <Text>Thanh toán qua thẻ quốc tế</Text>
                    <Button
                        title="Chọn"
                        onPress={() => setBankCode('INTCARD')}
                        disabled={bankCode === 'INTCARD'}
                    />
                </View>
            </View>
            <View style={styles.formGroup}>
                <Text>Ngôn ngữ</Text>
                <View style={styles.radioGroup}>
                    <Text>Tiếng Việt</Text>
                    <Button
                        title="Chọn"
                        onPress={() => setLanguage('vn')}
                        disabled={language === 'vn'}
                    />
                </View>
                <View style={styles.radioGroup}>
                    <Text>Tiếng Anh</Text>
                    <Button
                        title="Chọn"
                        onPress={() => setLanguage('en')}
                        disabled={language === 'en'}
                    />
                </View>
            </View>
            <Button
                title="Thanh toán"
                onPress={handleSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '80%',
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

export default PaymentScreen;
