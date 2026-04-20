import { useCallback } from "react";
import { Text, View } from "react-native";
import { syncPedometerLast7Days } from "../services/sync";
import { useFocusEffect } from "expo-router";

export default function Alarms() {

  useFocusEffect(
    useCallback(() => {
      syncPedometerLast7Days();
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/alarms.tsx to edit this screen.</Text>
    </View>
  );
}
