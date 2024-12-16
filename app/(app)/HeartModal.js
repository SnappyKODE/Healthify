import {View, Text,Pressable , TouchableOpacity, Modal , StyleSheet} from 'react-native'
import { useState } from 'react';

export default function HeartModal(){

    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View style={styles.screen}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Open Heart Modal</Text>
      </TouchableOpacity>

      {/* Popup Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Heart Rate & HRV</Text>
            <Text style={styles.modalText}>You have no measurement today</Text>
            <TouchableOpacity style={styles.measureButton}>
              <Text style={styles.measureButtonText}>+ Take a Measurement</Text>
            </TouchableOpacity>

            {/* Close Button */}
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
      },
      measureButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
      },
      measureButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
      },  closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
      },
    });
    