import { useGetStepsInRange, } from "@/hooks/stepHooks";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext, useState } from "react";
import { Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { syncSteps10Days } from "../services/sync";
import { RepoContext} from "@/providers/repositoryProviders";


export default function History() {
  const repository = useContext(RepoContext);
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
  const stepTrackersBetween = useGetStepsInRange(from, to);

  useFocusEffect(
    useCallback(() => {
      syncSteps10Days(repository);
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
