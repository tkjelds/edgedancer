import { useStepTrackers } from "@/hooks/stepTrackerHook";
import { stepTracker } from "@/models/stepTracker";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function History() {
  const { stepTrackers, refetch } = useStepTrackers();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/history.tsx to edit this screen.</Text>
      {stepTrackers.map((st, index) => (
        <Text key={index}>{st.date.toString()} - {st.steps} steps</Text>
      ))}
    </View>
  );
}
