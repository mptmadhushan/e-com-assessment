import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Categories from "../components/categories";
import FeatureRow from "../components/featuredRow";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { getProducts } from "../api/getProductAPI";


export default function HomeScreen() {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigation = useNavigation();
  const categories = [
    {
      id:1,
      name:'Shoes'
    },{
      id:2,
      name:'Bags'
    },{
      id:3,
      name:'Phones'
    },{
      id:4,
      name:'Kids'
    },{
      id:5,
      name:'Mens'
    },{
      id:6,
      name:'Womens'
    },
  ]
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  useEffect(() => {
    getProducts()
      .then((response) => {
        if (response.error) {
          console.log(response.error);
          return;
        }
        const { data } = response;

        setFeaturedCategories(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="flex-row items-center space-x-2 px-4 pb-2 ">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput
            placeholder="Shoes"
            className="ml-2 flex-1"
            keyboardType="default"
          />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin height="20" width="20" stroke="gray" />
            <Text className="text-gray-600">Colombo</Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-3 rounded-full"
        >
          <Icon.Sliders
            height={20}
            width={20}
            strokeWidth="2.5"
            stroke="white"
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <Categories />

        <View className="mt-5">
          {featuredCategories &&
            categories?.map((category) => {
              return (
                <FeatureRow
                  key={category.id}
                  id={category.id}
                  title={category?.name}
                  productList={featuredCategories}
                />
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
