import { useCallback } from "react";
import { Text, View } from "react-native";
import { syncSteps7Days } from "../services/sync";
import { useFocusEffect } from "expo-router";
import { useStepRepo } from "@/providers/repositoryProviders";

export default function Alarms() {
  const repository = useStepRepo();
  useFocusEffect(
    useCallback(() => {
      syncSteps7Days(repository);
    }, [repository])
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
