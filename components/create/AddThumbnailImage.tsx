import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, spacing } from "@/theme";
import { FileMedia } from "@/@types/Posts.type";
import { Button, Typography } from "../common";
import { icons } from "@/assets";

interface AddThumbnailImageProps {
  openPicker: (mediaType: string) => void;
  thumbnail: FileMedia;
  clearMedia: (type: string) => void;
  uploading: boolean;
}

const AddThumbnailImage = ({
  openPicker,
  thumbnail,
  clearMedia,
  uploading,
}: AddThumbnailImageProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Typography
          content="Thumbnail Image"
          variant="mediumRegular"
          color={colors.gray.DEFAULT}
        />

        {thumbnail.uri && (
          <Button
            isLoading={uploading}
            variant="smallRegular"
            title="Clear"
            containerStyles={styles.clearButton}
            textStyles={{ color: "white" }}
            onPress={() => clearMedia("thumbnail")}
          />
        )}
      </View>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => openPicker("image")}
      >
        {thumbnail.uri ? (
          <Image
            source={{ uri: thumbnail.uri }}
            resizeMode="cover"
            style={styles.thumbnailImage}
          />
        ) : (
          <View style={styles.chooseThumbnailContainer}>
            <Image
              source={icons.upload}
              resizeMode="contain"
              alt="upload"
              style={styles.chooseThumbnailIcon}
            />
            <Typography content="Choose a file" variant="smallRegular" />
          </View>
        )}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddThumbnailImage;

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.small,
    rowGap: spacing.small,
    alignItems: "flex-start",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  thumbnailImage: {
    width: "100%",
    height: 150,
    borderRadius: spacing.xxLarge,
  },
  chooseThumbnailContainer: {
    width: "100%",
    height: 58,
    backgroundColor: colors.black[100],
    borderRadius: spacing.normal,
    borderWidth: 2,
    borderColor: colors.black[200],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 2,
  },
  chooseThumbnailIcon: { width: spacing.large, height: spacing.large },
  clearButton: {
    minHeight: 20,
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.red.redDark,
  },

  // ////////////////////////////////////////////

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
