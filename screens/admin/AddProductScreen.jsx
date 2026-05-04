import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createProduct } from '../../services/productService';
import { getToken } from '../../utils/storage';
import CustomButton from '../../components/CustomButton';

export default function AddProductScreen() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleAddProduct = async () => {
        if (!name || !price || !category || !stock || !imageUri) {
            Alert.alert("Missing Details", "Please fill all required fields and select an image.");
            return;
        }

        try {
            setLoading(true);
            const token = await getToken();
            const formData = new FormData();
            
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('category', category.toLowerCase());
            formData.append('stock', stock);
            
            const filename = imageUri.split('/').pop() || 'product.jpg';
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;

            formData.append('image', { uri: imageUri, name: filename, type });

            await createProduct(formData, token);
            Alert.alert("Success", "Product added successfully!");
            
            // clear form
            setName('');
            setPrice('');
            setDescription('');
            setCategory('');
            setStock('');
            setImageUri(null);

        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add New Product</Text>
            
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                ) : (
                    <Text style={styles.imagePickerText}>Tap to Select an Image</Text>
                )}
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                multiline
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Category (e.g. bat, ball, gloves)"
                value={category}
                onChangeText={setCategory}
            />
            <TextInput
                style={styles.input}
                placeholder="Stock Quantity"
                keyboardType="numeric"
                value={stock}
                onChangeText={setStock}
            />

            <CustomButton 
                title={loading ? "Adding Product..." : "Add Product"} 
                onPress={handleAddProduct} 
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#0f172a',
        textAlign: 'center',
    },
    imagePicker: {
        height: 200,
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderStyle: 'dashed',
    },
    imagePreview: {
        width: '100%',
        height: '100%',
    },
    imagePickerText: {
        color: '#64748b',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#f8fafc',
    },
});
