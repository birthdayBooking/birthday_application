import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
export default function BookingServiceScreen() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('https://birthday-backend-8sh5.onrender.com/api/v1/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }
  };

  const toggleServiceSelection = (serviceId) => {
    setSelectedServices(prevSelectedServices => {
      if (prevSelectedServices.includes(serviceId)) {
        return prevSelectedServices.filter(id => id !== serviceId);
      } else {
        return [...prevSelectedServices, serviceId];
      }
    });
  };

  const handleSubmitBooking = async () => {
    try {
        // Gửi selectedServices lên backend để đặt hàng
        console.log('Selected services:', selectedServices);
        
        // Gửi yêu cầu thêm dịch vụ vào đơn đặt hàng
        const response = await fetch('https://birthday-backend-8sh5.onrender.com/api/v1/orders/addService', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderId: 'yourOrderId', // Thay 'yourOrderId' bằng ID của đơn đặt hàng tương ứng
                serviceId: 'yourServiceId' // Thay 'yourServiceId' bằng ID của dịch vụ được chọn
            })
        });
        const data = await response.json();
        console.log('Response:', data);
        
        // Navigate back to the Order Screen to proceed with payment
        navigation.goBack();
    } catch (err) {
        console.error('Error while submitting booking:', err.message);
        // Xử lý lỗi tại đây nếu cần
    }
};

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleServiceSelection(item.id)}>
            <View style={styles.serviceItem}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.servicePrice}>{item.price}</Text>
              <Checkbox
                value={selectedServices.includes(item.id)}
                onValueChange={() => toggleServiceSelection(item.id)}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitBooking}>
        <Text style={styles.submitButtonText}>Submit Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  servicePrice: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
