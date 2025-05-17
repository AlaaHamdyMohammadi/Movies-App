import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: loadingMovies,
    error: errorMovies,
    refetch: refetchMovies,
  } = useFetch(() => fetchMovies({ query: "" }), true);

  useEffect(() => {
    // We can also manually trigger a fetch when the component mounts
    if (!movies) {
      refetchMovies();
    }
  }, []);
  console.log("movies = ", movies);
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      {loadingMovies ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="mt-10 self-center"
        />
      ) : errorMovies ? (
        // @ts-ignore
        <Text>Error: {errorMovies?.message}</Text>
      ) : (
        <View className="flex-1 mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          />
          <>
            <Text className="text-lg text-white mt-5 mb-3 p-3">
              Latest movies
            </Text>
            <FlatList
              data={movies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "space-between",
                gap: 20,
                paddingRight: 5,
                marginBottom: 20,
              }}
              className="mb-32 mt-2 p-3"
              // scrollEnabled={false}
            />
          </>
        </View>
      )}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {/* <Text className="font-bold text-2xl text-white">Welcome Alaa ❤️</Text> */}
        {/* <View className="flex-1 mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          />
        </View> */}
      </ScrollView>
    </View>
  );
}
