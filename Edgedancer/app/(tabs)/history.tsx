import { useStepTrackers } from "@/hooks/stepTrackerHook";
import { Text, View } from "react-native";

export default function History() {
  const stepTrackers = useStepTrackers();
  stepTrackers.map(st => console.log(st))
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
        <Text key={index}>{st.date.toString()} - {st.steps} steps - {st.finished ? "Finished" : "Not Finished"}</Text>
      ))}
    </View>
  );
}
