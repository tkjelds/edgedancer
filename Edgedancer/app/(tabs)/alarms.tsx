import { useCallback, useContext } from "react";
import { Text, View } from "react-native";
import { syncSteps10Days } from "../services/sync";
import { useFocusEffect } from "expo-router";
import { RepoContext} from "@/providers/repositoryProviders";

export default function Alarms() {
  const repository = useContext(RepoContext)
  useFocusEffect(
    useCallback(() => {
      syncSteps10Days(repository);
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
