import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface SearchProps {
    onPress: () => void;
    placeholder: string;
}

const SearchBar = ({onPress, placeholder}: SearchProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      {/* <Text className='text-white'>SearchBar</Text> */}
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        value=""
        onPress={onPress}
        onChangeText={() => {}}
        placeholder={placeholder}
        placeholderTextColor="#a8b5bd"
        className="flex-1 ml-5 text-white"
      />
    </View>
  );
};

export default SearchBar;
