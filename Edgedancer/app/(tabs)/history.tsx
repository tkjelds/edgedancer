import { useGetStepTrackersBetween, } from "@/hooks/stepTrackerHook";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { syncSteps7Days } from "../services/sync";
import { useStepRepo } from "@/providers/repositoryProviders";


export default function History() {
  const repository = useStepRepo();
  const [from, setFrom] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    d.setHours(0,0,0,0);
    return d;
  });
  const [ to, setTo ] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0,0,0,0);
    return d; 
  });
  const stepTrackersBetween = useGetStepTrackersBetween(from, to);

  useFocusEffect(
    useCallback(() => {
      syncSteps7Days(repository);
    }, [repository])
  );
  // useFocusEffect(
  //   useCallback(() => {
  //     refetch();
  //   }, [refetch])
  // );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      >
      <DateTimePicker mode="date" display="compact" value={from} onChange={(event, date) => setFrom(date as Date)} />
      <DateTimePicker mode="date" display="compact" value={to}  onChange={(event, date) => setTo(date as Date)} />
      <Text>Edit app/history.tsx to edit this screen.</Text>
      {stepTrackersBetween.map((st, index) => (
        <Text key={index}>{st.date.toString()} - {st.steps} steps</Text>
      ))}
    </View>
  );
}
