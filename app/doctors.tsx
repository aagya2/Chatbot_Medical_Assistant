// app/doctors.tsx

import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { colors } from "../src/themes/colors";
import { spacing } from "../src/themes/spacing";
import { doctors as doctorImgs } from "../src/assets/assets";

import { DoctorCard } from "../src/components/DoctorCard";
import { ChatbotFloating } from "../src/components/ChatbotFloating";

type Doc = {
  id: string;
  name: string;
  specialityKey: string; // must match specialties.tsx keys
  specialityLabel: string;
  rating: string;
  image: any;
};

const ALL_DOCTORS: Doc[] = [
  // ✅ General Physician
  { id: "dr-yadav", name: "Dr. Yadav", specialityKey: "general", specialityLabel: "General Physician", rating: "4.7", image: doctorImgs.yadav },
  { id: "dr-bharti", name: "Dr. Bharti", specialityKey: "general", specialityLabel: "General Physician", rating: "4.6", image: doctorImgs.bharti },
  { id: "dr-bhattarai", name: "Dr. Bhattarai", specialityKey: "general", specialityLabel: "General Physician", rating: "4.5", image: doctorImgs.bhattarai },

  // ✅ NEW general
  { id: "dr-amita", name: "Dr. Amita", specialityKey: "general", specialityLabel: "General Physician", rating: "4.6", image: doctorImgs.amita },
  { id: "dr-hemant", name: "Dr. Hemant", specialityKey: "general", specialityLabel: "General Physician", rating: "4.5", image: doctorImgs.hemant },
  { id: "dr-manoj", name: "Dr. Manoj", specialityKey: "general", specialityLabel: "General Physician", rating: "4.4", image: doctorImgs.manoj },
  { id: "dr-rinky", name: "Dr. Rinky", specialityKey: "general", specialityLabel: "General Physician", rating: "4.6", image: doctorImgs.rinky },

  // ✅ Cardiology
  { id: "dr-lisa", name: "Dr. Lisa", specialityKey: "cardiology", specialityLabel: "Cardiology", rating: "4.5", image: doctorImgs.lisa },
  { id: "dr-regmi", name: "Dr. Regmi", specialityKey: "cardiology", specialityLabel: "Cardiology", rating: "4.7", image: doctorImgs.regmi },

  // ✅ NEW cardiology
  { id: "dr-aquila", name: "Dr. Aquila", specialityKey: "cardiology", specialityLabel: "Cardiology", rating: "4.7", image: doctorImgs.aquila },
  { id: "dr-apurb", name: "Dr. Apurb", specialityKey: "cardiology", specialityLabel: "Cardiology", rating: "4.6", image: doctorImgs.apurb },
  { id: "dr-milan", name: "Dr. Milan", specialityKey: "cardiology", specialityLabel: "Cardiology", rating: "4.5", image: doctorImgs.milan },
  { id: "dr-poonam", name: "Dr. Poonam", specialityKey: "cardiology", specialityLabel: "Cardiology", rating: "4.6", image: doctorImgs.poonam },
  { id: "dr-satyadeep", name: "Dr. Satyadeep", specialityKey: "cardiology", specialityLabel: "Cardiology", rating: "4.7", image: doctorImgs.satyadeep },

  // ✅ Dermatology
  { id: "dr-oliver", name: "Dr. Oliver", specialityKey: "dermatology", specialityLabel: "Dermatology", rating: "4.3", image: doctorImgs.oliver },
  { id: "dr-adhikari", name: "Dr. Adhikari", specialityKey: "dermatology", specialityLabel: "Dermatology", rating: "4.6", image: doctorImgs.adhikari },

  // ✅ NEW dermatology
  { id: "dr-jeena", name: "Dr. Jeena", specialityKey: "dermatology", specialityLabel: "Dermatology", rating: "4.6", image: doctorImgs.jeena },
  { id: "dr-sakshi", name: "Dr. Sakshi", specialityKey: "dermatology", specialityLabel: "Dermatology", rating: "4.7", image: doctorImgs.sakshi },
  { id: "dr-susmita", name: "Dr. Susmita", specialityKey: "dermatology", specialityLabel: "Dermatology", rating: "4.7", image: doctorImgs.susmita },
  { id: "dr-ranjit", name: "Dr. Ranjit", specialityKey: "dermatology", specialityLabel: "Dermatology", rating: "4.5", image: doctorImgs.ranjit },
  { id: "dr-sabina", name: "Dr. Sabina", specialityKey: "dermatology", specialityLabel: "Dermatology", rating: "4.6", image: doctorImgs.sabina },

  // ✅ Dentistry
  { id: "dr-elly", name: "Dr. Elly", specialityKey: "dentistry", specialityLabel: "Dentistry", rating: "4.6", image: doctorImgs.elly },
  { id: "dr-parajuli", name: "Dr. Parajuli", specialityKey: "dentistry", specialityLabel: "Dentistry", rating: "4.5", image: doctorImgs.parajuli },

  // ✅ NEW dentistry
  { id: "dr-palistha", name: "Dr. Palistha", specialityKey: "dentistry", specialityLabel: "Dentistry", rating: "4.6", image: doctorImgs.palistha },
  { id: "dr-parbesh", name: "Dr. Parbesh", specialityKey: "dentistry", specialityLabel: "Dentistry", rating: "4.5", image: doctorImgs.parbesh },
  { id: "dr-manish", name: "Dr. Manish", specialityKey: "dentistry", specialityLabel: "Dentistry", rating: "4.6", image: doctorImgs.manish },

  // ✅ Neurology
  { id: "dr-sangeeta", name: "Dr. Sangeeta", specialityKey: "neurology", specialityLabel: "Neurology", rating: "4.7", image: doctorImgs.sangeeta },

  // ✅ NEW neurology
  { id: "dr-sumit", name: "Dr. Sumit", specialityKey: "neurology", specialityLabel: "Neurology", rating: "4.5", image: doctorImgs.sumit },
  { id: "dr-ambuj", name: "Dr. Ambuj", specialityKey: "neurology", specialityLabel: "Neurology", rating: "4.6", image: doctorImgs.ambuj },
  { id: "dr-satish", name: "Dr. Satish", specialityKey: "neurology", specialityLabel: "Neurology", rating: "4.7", image: doctorImgs.satish },

  // ✅ Pediatrics
  { id: "dr-sandhya", name: "Dr. Sandhya", specialityKey: "pediatrics", specialityLabel: "Pediatrics", rating: "4.8", image: doctorImgs.sandhya },

  // ✅ NEW pediatrics
  { id: "dr-manita", name: "Dr. Manita", specialityKey: "pediatrics", specialityLabel: "Pediatrics", rating: "4.7", image: doctorImgs.manita },
  { id: "dr-kripa", name: "Dr. Kripa", specialityKey: "pediatrics", specialityLabel: "Pediatrics", rating: "4.6", image: doctorImgs.kripa },

  // ✅ Orthopedics
  { id: "dr-regmi-ortho", name: "Dr. Regmi", specialityKey: "orthopedics", specialityLabel: "Orthopedics", rating: "4.6", image: doctorImgs.regmi },

  // ✅ NEW orthopedics
  { id: "dr-prajjwal", name: "Dr. Prajjwal", specialityKey: "orthopedics", specialityLabel: "Orthopedics", rating: "4.5", image: doctorImgs.prajjwal },
];

function metaFor(specialityKey: string) {
  switch (specialityKey) {
    case "general":
      return { fee: 500, experience: "8 yrs", status: "online" as const };
    case "cardiology":
      return { fee: 800, experience: "12 yrs", status: "online" as const };
    case "dermatology":
      return { fee: 650, experience: "9 yrs", status: "offline" as const };
    case "dentistry":
      return { fee: 600, experience: "10 yrs", status: "online" as const };
    case "neurology":
      return { fee: 900, experience: "13 yrs", status: "online" as const };
    case "pediatrics":
      return { fee: 750, experience: "11 yrs", status: "online" as const };
    case "orthopedics":
      return { fee: 850, experience: "14 yrs", status: "offline" as const };
    default:
      return { fee: 650, experience: "8 yrs", status: "online" as const };
  }
}

export default function Doctors() {
  const params = useLocalSearchParams();
  const speciality = String(params.speciality ?? "general");

  const filtered = useMemo(() => {
    return ALL_DOCTORS.filter((d) => d.specialityKey === speciality);
  }, [speciality]);

  const title = filtered[0]?.specialityLabel ?? "Doctors";

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backTxt}>←</Text>
        </Pressable>

        <Text style={styles.title}>{title}</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: spacing.sm, paddingBottom: 170 }}
      >
        {filtered.length === 0 ? (
          <Text style={styles.empty}>No doctors found for this specialty yet.</Text>
        ) : (
          filtered.map((d) => {
            const meta = metaFor(d.specialityKey);
            return (
              <DoctorCard
                key={d.id}
                name={d.name}
                speciality={d.specialityLabel}
                rating={d.rating}
                image={d.image}
                fee={meta.fee}
                experience={meta.experience}
                status={meta.status}
                onPress={() => router.push(`/doctor/${d.id}` as any)}
                onBook={() =>
                  router.push(
                    `/appointments?doctor=${encodeURIComponent(
                      d.name
                    )}&speciality=${encodeURIComponent(d.specialityLabel)}` as any
                  )
                }
              />
            );
          })
        )}
      </ScrollView>

      {/* Chatbot (NOT linked) */}
      <ChatbotFloating
        username="User"
        promptText="Hi User! Looking for doctor?"
        delayMs={4500}
        autoHideMs={4500}
        onOpen={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, position: "relative" },

  header: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#F2F7FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  backTxt: { fontSize: 20, fontWeight: "900", color: colors.text },
  title: { fontSize: 20, fontWeight: "900", color: colors.text },

  empty: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
    fontSize: 14,
    fontWeight: "800",
    color: colors.mutedText,
  },
});