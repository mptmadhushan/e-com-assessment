import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProdRow from "../components/prodRow";
import BasketIcon from "../components/basketIcon";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, setProduct } from "../slices/productSlice";
import { emptyBasket } from "../slices/basketSlice";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";

export default function ProductScreen() {
  const navigation = useNavigation();
  const product = useSelector(selectProduct);
  let dispatch = useDispatch();
  const {
    params: { id, title, imgUrl, rating, type, address, description, prodList },
  } = useRoute();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  useEffect(() => {
    if (product && product.id != id) {
      dispatch(emptyBasket());
    }
    dispatch(
      setProduct({
        id,
        title,
        imgUrl,
        rating,
        type,
        address,
        description,
        prodList,
      })
    );
  }, []);
  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            className="w-full h-72"
            source={require("../assets/shoesBack.webp")}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <Text className="text-3xl font-bold">Shoes</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Image
                  source={require("../assets/images/fullStar.png")}
                  className="h-4 w-4"
                />
                <Text className="text-xs">
                  <Text className="text-green-700">{rating}</Text>
                  <Text className="text-gray-700"> (4.6k review)</Text> ·{" "}
                  <Text className="font-semibold text-gray-700">{type}</Text>
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <Icon.MapPin color="gray" width={15} height={15} />
                <Text className="text-gray-800 text-xs">
                  {" "}
                  Nearby · {address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2">{description}</Text>
          </View>
        </View>
        <View className="pb-36 bg-white">
          <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
          {prodList.map((prodItem) => {
            return (
              <ProdRow
                key={prodItem.id}
                id={prodItem.id}
                name={prodItem.name}
                description={prodItem.description}
                price={parseFloat(prodItem.price.amount)}
                image={prodItem.mainImage}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}
