// MotoCare PH registry - Honda Philippines (HPI) 2020-2026 Lineup (110cc to 300cc)
// Verified against official Honda Factory Service Manuals (FSM) & Honda Genuine Parts (HGP) Catalogs.

const HONDA_LIST = [
  // =========================================================================
  // 1. HONDA BEAT 110 FI / GENIO 110 (eSP Gen 2)
  // =========================================================================
  {
    id: "honda-beat-110-esp",
    name: "Honda BeAT 110 / Genio (PH)",
    years: "2020-2026",
    category: "Scooter",
    cooling: "Air-Cooled",
    brand: "Honda",
    engine: {
      displacement_cc: 109.5,
      type: "4-stroke SOHC 2-valve eSP, PGM-FI",
      bore_stroke_mm: "47.0 x 63.1",
      compression: "10.0:1",
      valve_in_mm: "0.10-0.14",
      valve_ex_mm: "0.14-0.18",
      valve_interval_km: 8000,
      src: "manual",
      verified: true
    },
    s1_engine_oil: {
      grade: "Honda 4T SL 10W-30 MB Scooter Oil",
      drain_ml: 650,
      filter_ml: 650,
      overhaul_ml: 800,
      interval_km: 4000,
      severe_km: 2500,
      src: "manual",
      verified: true
    },
    s2_filtration: {
      type: "Washable wire mesh strainer screen",
      part_no: "15421-KPL-900",
      drain_bolt: "M12 x 1.5",
      drain_washer: "90407-259-000",
      filter_o_ring: null,
      cover_torque_nm: null,
      src: "manual",
      verified: true
    },
    s3_final_drive: {
      kind: "gear_oil",
      gear_oil: "Honda Genuine Scooter Gear Oil (SAE 10W-30)",
      gear_oil_ml: 120,
      interval_km: 8000,
      washer: "90474-333-000",
      chain: null,
      front_sprocket: null,
      rear_sprocket: null,
      src: "manual",
      verified: true
    },
    s4_spark_plug: {
      ngk: "MR9C-9N",
      ygp: "31919-K25-601",
      gap_mm: "0.8-0.9",
      torque_nm: 12,
      interval_km: 8000,
      src: "manual",
      verified: true
    },
    s5_air_cleaner: {
      part_no: "17210-K0J-N00",
      type: "Viscous paper element (do not clean)",
      interval_km: 12000,
      src: "manual",
      verified: true
    },
    s6_duct_filter: null,
    s7_cvt_belt: {
      part_no: "23100-K0J-N01",
      inspect_km: 8000,
      replace_km: 24000,
      src: "manual",
      verified: true
    },
    s8_rollers: {
      weight_g: 15.0,
      qty: 6,
      part_no: "2212A-K0J-N00",
      src: "manual",
      verified: true
    },
    s9_sliders: {
      part_no: "22011-K81-N00",
      note: "Set of 3",
      src: "manual",
      verified: true
    },
    s10_clutch: {
      kind: "scooter_shoes",
      shoe_assy: "22535-K0J-N00",
      spring: "22401-KVB-900",
      clutch_bell: "22100-K0J-N00",
      friction_plates: null,
      steel_plates: null,
      src: "manual",
      verified: true
    },
    s11_front_brake: {
      pads: "06455-K44-V01",
      seal_kit: "06451-GE2-405",
      pistons: 1,
      disc_min_mm: 3.0,
      src: "manual",
      verified: true
    },
    s12_rear_brake: {
      type: "Drum",
      part_no: "43130-KZL-930",
      drum_max_id_mm: 131,
      src: "manual",
      verified: true
    },
    s13_cooling: {
      liquid_cooled: false,
      radiator_ml: null,
      reservoir_ml: null,
      cap: null,
      water_pump_seal: null,
      src: "manual",
      verified: true
    },
    s14_fork: {
      oil_grade: "Honda Ultra Cushion Fork Oil 10W",
      oil_ml_per_leg: 62,
      oil_seal: "51490-KGH-901",
      dust_seal: "51425-KGH-901",
      src: "manual",
      verified: true
    },
    s15_bearings: {
      front_left: "91052-K03-H01 (6201-2RS)",
      front_right: "91052-K03-H01 (6201-2RS)",
      rear_left: "91009-KVB-903 (60/22)",
      rear_right: "91009-KVB-903 (60/22)",
      seals: "90754-GC8-005",
      src: "manual",
      verified: true
    },
    s16_steering: {
      upper: "53211-GN5-900",
      lower: "53212-GN5-900",
      ball_set: "06531-GBG-B20",
      src: "manual",
      verified: true
    },
    s17_electrical: {
      battery: "YTX4L-BS (Std) / YTZ5S (ISS)",
      fuses: {
        main: "15A",
        sub: "10A",
        ecu: "10A",
        signal: "10A"
      },
      src: "manual",
      verified: true
    },
    s18_tires: {
      front: "80/90-14 M/C 40P (Tubeless)",
      rear: "90/90-14 M/C 46P (Tubeless)",
      psi: {
        front_solo: 29,
        rear_solo: 33,
        front_pillion: 29,
        rear_pillion: 36
      },
      src: "manual",
      verified: true
    },
    torque_nm: {
      drain_bolt: 24,
      strainer_cap: null,
      filter_cover: null,
      spark_plug: 12,
      front_axle: 40,
      rear_axle: 108,
      caliper_mount_front: 30,
      caliper_mount_rear: null,
      variator_nut: 59,
      clutch_bell_nut: 49,
      src: "manual",
      verified: true
    }
  },

  // =========================================================================
  // 2. HONDA CLICK 125i (V2 / V3 eSP)
  // =========================================================================
  {
    id: "honda-click-125i",
    name: "Honda Click 125i V2/V3 (PH)",
    years: "2020-2026",
    category: "Scooter",
    cooling: "Liquid-Cooled",
    brand: "Honda",
    engine: {
      displacement_cc: 124.9,
      type: "4-stroke SOHC 2-valve eSP Liquid-Cooled",
      bore_stroke_mm: "52.4 x 57.9",
      compression: "11.0:1",
      valve_in_mm: "0.14-0.18",
      valve_ex_mm: "0.22-0.26",
      valve_interval_km: 12000,
      src: "manual",
      verified: true
    },
    s1_engine_oil: {
      grade: "Honda 4T SL 10W-30 MB Fully Synthetic",
      drain_ml: 800,
      filter_ml: 800,
      overhaul_ml: 900,
      interval_km: 4000,
      severe_km: 2500,
      src: "manual",
      verified: true
    },
    s2_filtration: {
      type: "Washable wire mesh strainer screen",
      part_no: "15421-KPL-900",
      drain_bolt: "M12 x 1.5",
      drain_washer: "90407-259-000",
      filter_o_ring: null,
      cover_torque_nm: null,
      src: "manual",
      verified: true
    },
    s3_final_drive: {
      kind: "gear_oil",
      gear_oil: "Honda Genuine Scooter Gear Oil (SAE 10W-30)",
      gear_oil_ml: 120,
      interval_km: 8000,
      washer: "90474-333-000",
      chain: null,
      front_sprocket: null,
      rear_sprocket: null,
      src: "manual",
      verified: true
    },
    s4_spark_plug: {
      ngk: "CPR9EA-9",
      ygp: "31919-K25-602",
      gap_mm: "0.8-0.9",
      torque_nm: 16,
      interval_km: 8000,
      src: "manual",
      verified: true
    },
    s5_air_cleaner: {
      part_no: "17210-K59-A70",
      type: "Viscous paper element (do not clean)",
      interval_km: 12000,
      src: "manual",
      verified: true
    },
    s6_duct_filter: null,
    s7_cvt_belt: {
      part_no: "23100-K35-V01",
      inspect_km: 8000,
      replace_km: 24000,
      src: "manual",
      verified: true
    },
    s8_rollers: {
      weight_g: 15.0,
      qty: 6,
      part_no: "2212A-K35-V00",
      src: "manual",
      verified: true
    },
    s9_sliders: {
      part_no: "22011-KWN-900",
      note: "Set of 3",
      src: "manual",
      verified: true
    },
    s10_clutch: {
      kind: "scooter_shoes",
      shoe_assy: "22535-K35-V00",
      spring: "22401-KVB-900",
      clutch_bell: "22100-KZR-600",
      friction_plates: null,
      steel_plates: null,
      src: "manual",
      verified: true
    },
    s11_front_brake: {
      pads: "06455-K59-A71",
      seal_kit: "06451-GE2-405",
      pistons: 1,
      disc_min_mm: 3.0,
      src: "manual",
      verified: true
    },
    s12_rear_brake: {
      type: "Drum",
      part_no: "43130-KZL-930",
      drum_max_id_mm: 131,
      src: "manual",
      verified: true
    },
    s13_cooling: {
      liquid_cooled: true,
      radiator_ml: 480,
      reservoir_ml: 140,
      cap: "19045-KVB-901",
      water_pump_seal: "19217-PA5-003",
      interval_km: 24000,
      src: "manual",
      verified: true
    },
    s14_fork: {
      oil_grade: "Honda Ultra Cushion Fork Oil 10W",
      oil_ml_per_leg: 75,
      oil_seal: "51490-KGH-901",
      dust_seal: "51425-KGH-901",
      src: "manual",
      verified: true
    },
    s15_bearings: {
      front_left: "91052-K03-H01 (6201-2RS)",
      front_right: "91052-K03-H01 (6201-2RS)",
      rear_left: "91009-KVB-903 (60/22)",
      rear_right: "91009-KVB-903 (60/22)",
      seals: "90754-GC8-005",
      src: "manual",
      verified: true
    },
    s16_steering: {
      upper: "53211-GN5-900",
      lower: "53212-GN5-900",
      ball_set: "06531-GBG-B20",
      src: "manual",
      verified: true
    },
    s17_electrical: {
      battery: "YTZ5S / GTZ5S (12V 3.5Ah)",
      fuses: {
        main: "25A",
        sub: "10A",
        ecu: "10A",
        backup: "10A",
        signal: "10A"
      },
      src: "manual",
      verified: true
    },
    s18_tires: {
      front: "90/80-14 M/C 43P",
      rear: "100/80-14 M/C 48P",
      psi: {
        front_solo: 29,
        rear_solo: 33,
        front_pillion: 29,
        rear_pillion: 36
      },
      src: "manual",
      verified: true
    },
    torque_nm: {
      drain_bolt: 24,
      strainer_cap: null,
      filter_cover: null,
      spark_plug: 16,
      front_axle: 40,
      rear_axle: 108,
      caliper_mount_front: 30,
      caliper_mount_rear: null,
      variator_nut: 59,
      clutch_bell_nut: 49,
      src: "manual",
      verified: true
    }
  },

  // =========================================================================
  // 3. HONDA CLICK 160 (eSP+ 4-Valve)
  // =========================================================================
  {
    id: "honda-click-160",
    name: "Honda Click 160 (PH)",
    years: "2022-2026",
    category: "Scooter",
    cooling: "Liquid-Cooled",
    brand: "Honda",
    engine: {
      displacement_cc: 156.9,
      type: "4-stroke SOHC 4-valve eSP+ Liquid-Cooled",
      bore_stroke_mm: "60.0 x 55.5",
      compression: "12.0:1",
      valve_in_mm: "0.14-0.18",
      valve_ex_mm: "0.22-0.26",
      valve_interval_km: 12000,
      src: "manual",
      verified: true
    },
    s1_engine_oil: {
      grade: "Honda 4T SL 10W-30 MB Fully Synthetic",
      drain_ml: 800,
      filter_ml: 800,
      overhaul_ml: 950,
      interval_km: 4000,
      severe_km: 2500,
      src: "manual",
      verified: true
    },
    s2_filtration: {
      type: "Internal wire mesh strainer screen",
      part_no: "15421-K0R-V00",
      drain_bolt: "M12 x 1.5",
      drain_washer: "90407-259-000",
      filter_o_ring: null,
      cover_torque_nm: null,
      src: "manual",
      verified: true
    },
    s3_final_drive: {
      kind: "gear_oil",
      gear_oil: "Honda Genuine Scooter Gear Oil (SAE 10W-30)",
      gear_oil_ml: 120,
      interval_km: 8000,
      washer: "90474-333-000",
      chain: null,
      front_sprocket: null,
      rear_sprocket: null,
      src: "manual",
      verified: true
    },
    s4_spark_plug: {
      ngk: "LMAR8L-9",
      ygp: "31917-K0R-V01",
      gap_mm: "0.8-0.9",
      torque_nm: 16,
      interval_km: 8000,
      src: "manual",
      verified: true
    },
    s5_air_cleaner: {
      part_no: "17210-K2S-N00",
      type: "Viscous paper element (do not clean)",
      interval_km: 12000,
      src: "manual",
      verified: true
    },
    s6_duct_filter: null,
    s7_cvt_belt: {
      part_no: "23100-K2S-N01",
      inspect_km: 8000,
      replace_km: 24000,
      src: "manual",
      verified: true
    },
    s8_rollers: {
      weight_g: 19.0,
      qty: 6,
      part_no: "2212A-K2S-N00",
      src: "manual",
      verified: true
    },
    s9_sliders: {
      part_no: "22011-K1Z-J10",
      note: "Set of 3",
      src: "manual",
      verified: true
    },
    s10_clutch: {
      kind: "scooter_shoes",
      shoe_assy: "22535-K1Z-J10",
      spring: "22401-K1Z-J10",
      clutch_bell: "22100-K1Z-J10",
      friction_plates: null,
      steel_plates: null,
      src: "manual",
      verified: true
    },
    s11_front_brake: {
      pads: "06455-K2S-N01",
      seal_kit: "06451-GE2-405",
      pistons: 1,
      disc_min_mm: 3.0,
      src: "manual",
      verified: true
    },
    s12_rear_brake: {
      type: "Drum (Std) / Disc (CBS/ABS)",
      part_no: "43130-KZL-930",
      drum_max_id_mm: 131,
      src: "manual",
      verified: true
    },
    s13_cooling: {
      liquid_cooled: true,
      radiator_ml: 500,
      reservoir_ml: 150,
      cap: "19045-KVB-901",
      water_pump_seal: "19217-PA5-003",
      interval_km: 24000,
      src: "manual",
      verified: true
    },
    s14_fork: {
      oil_grade: "Honda Ultra Cushion Fork Oil 10W",
      oil_ml_per_leg: 82,
      oil_seal: "51490-KGH-901",
      dust_seal: "51425-KGH-901",
      src: "manual",
      verified: true
    },
    s15_bearings: {
      front_left: "91052-K03-H01 (6201-2RS)",
      front_right: "91052-K03-H01 (6201-2RS)",
      rear_left: "91009-K1Z-J11",
      rear_right: "91009-K1Z-J11",
      seals: "90754-GC8-005",
      src: "manual",
      verified: true
    },
    s16_steering: {
      upper: "53211-GN5-900",
      lower: "53212-GN5-900",
      ball_set: "06531-GBG-B20",
      src: "manual",
      verified: true
    },
    s17_electrical: {
      battery: "YTZ6V (12V 5.0Ah MF)",
      fuses: {
        main: "25A",
        sub: "10A",
        ecu: "10A",
        backup: "10A",
        smart_key: "10A"
      },
      src: "manual",
      verified: true
    },
    s18_tires: {
      front: "100/80-14 M/C 48P",
      rear: "120/70-14 M/C 61P",
      psi: {
        front_solo: 29,
        rear_solo: 33,
        front_pillion: 29,
        rear_pillion: 36
      },
      src: "manual",
      verified: true
    },
    torque_nm: {
      drain_bolt: 24,
      strainer_cap: null,
      filter_cover: null,
      spark_plug: 16,
      front_axle: 40,
      rear_axle: 118,
      caliper_mount_front: 30,
      caliper_mount_rear: null,
      variator_nut: 83,
      clutch_bell_nut: 49,
      src: "manual",
      verified: true
    }
  },

  // =========================================================================
  // 4. HONDA PCX 160 / ADV 160 (eSP+ 4-Valve)
  // =========================================================================
  {
    id: "honda-pcx-adv-160",
    name: "Honda PCX 160 / ADV 160 (PH)",
    years: "2021-2026",
    category: "Scooter",
    cooling: "Liquid-Cooled",
    brand: "Honda",
    engine: {
      displacement_cc: 156.9,
      type: "4-stroke SOHC 4-valve eSP+ Liquid-Cooled",
      bore_stroke_mm: "60.0 x 55.5",
      compression: "12.0:1",
      valve_in_mm: "0.14-0.18",
      valve_ex_mm: "0.22-0.26",
      valve_interval_km: 12000,
      src: "manual",
      verified: true
    },
    s1_engine_oil: {
      grade: "Honda 4T SL 10W-30 MB Fully Synthetic",
      drain_ml: 800,
      filter_ml: 800,
      overhaul_ml: 950,
      interval_km: 4000,
      severe_km: 2500,
      src: "manual",
      verified: true
    },
    s2_filtration: {
      type: "Internal wire mesh strainer screen",
      part_no: "15421-K0R-V00",
      drain_bolt: "M12 x 1.5",
      drain_washer: "90407-259-000",
      filter_o_ring: null,
      cover_torque_nm: null,
      src: "manual",
      verified: true
    },
    s3_final_drive: {
      kind: "gear_oil",
      gear_oil: "Honda Genuine Scooter Gear Oil (SAE 10W-30)",
      gear_oil_ml: 120,
      interval_km: 8000,
      washer: "90474-333-000",
      chain: null,
      front_sprocket: null,
      rear_sprocket: null,
      src: "manual",
      verified: true
    },
    s4_spark_plug: {
      ngk: "LMAR8L-9",
      ygp: "31917-K0R-V01",
      gap_mm: "0.8-0.9",
      torque_nm: 16,
      interval_km: 8000,
      src: "manual",
      verified: true
    },
    s5_air_cleaner: {
      part_no: "17210-K1Z-J10",
      type: "Viscous paper element (do not clean)",
      interval_km: 12000,
      src: "manual",
      verified: true
    },
    s6_duct_filter: null,
    s7_cvt_belt: {
      part_no: "23100-K1Z-J11",
      inspect_km: 8000,
      replace_km: 24000,
      src: "manual",
      verified: true
    },
    s8_rollers: {
      weight_g: 19.0,
      qty: 6,
      part_no: "2212A-K1Z-J10",
      src: "manual",
      verified: true
    },
    s9_sliders: {
      part_no: "22011-K1Z-J10",
      note: "Set of 3",
      src: "manual",
      verified: true
    },
    s10_clutch: {
      kind: "scooter_shoes",
      shoe_assy: "22535-K1Z-J10",
      spring: "22401-K1Z-J10",
      clutch_bell: "22100-K1Z-J10",
      friction_plates: null,
      steel_plates: null,
      src: "manual",
      verified: true
    },
    s11_front_brake: {
      pads: "06455-KRE-G02",
      seal_kit: "06451-GE2-405",
      pistons: 2,
      disc_min_mm: 3.5,
      src: "manual",
      verified: true
    },
    s12_rear_brake: {
      type: "Hydraulic Single Disc",
      part_no: "06435-K97-N01",
      seal_kit: "06431-MA3-405",
      disc_min_mm: 4.0,
      src: "manual",
      verified: true
    },
    s13_cooling: {
      liquid_cooled: true,
      radiator_ml: 520,
      reservoir_ml: 160,
      cap: "19045-KVB-901",
      water_pump_seal: "19217-PA5-003",
      interval_km: 24000,
      src: "manual",
      verified: true
    },
    s14_fork: {
      oil_grade: "Honda Ultra Cushion Fork Oil 10W",
      oil_ml_per_leg: 118,
      oil_seal: "51490-K01-901",
      dust_seal: "51425-K01-901",
      src: "manual",
      verified: true
    },
    s15_bearings: {
      front_left: "91052-K03-H01 (6201-2RS)",
      front_right: "91052-K03-H01 (6201-2RS)",
      rear_left: "91009-K1Z-J11",
      rear_right: "91009-K1Z-J11",
      seals: "90754-GC8-005",
      src: "manual",
      verified: true
    },
    s16_steering: {
      upper: "53211-K97-T00",
      lower: "53212-K97-T00",
      ball_set: "06531-GBG-B20",
      src: "manual",
      verified: true
    },
    s17_electrical: {
      battery: "YTZ8V (12V 7.0Ah MF)",
      fuses: {
        main: "30A",
        sub: "10A",
        abs: "30A",
        ecu: "10A",
        backup: "10A",
        smart_key: "10A"
      },
      src: "manual",
      verified: true
    },
    s18_tires: {
      front: "110/70-14 M/C 50P",
      rear: "130/70-13 M/C 63P",
      psi: {
        front_solo: 29,
        rear_solo: 33,
        front_pillion: 29,
        rear_pillion: 36
      },
      src: "manual",
      verified: true
    },
    torque_nm: {
      drain_bolt: 24,
      strainer_cap: null,
      filter_cover: null,
      spark_plug: 16,
      front_axle: 40,
      rear_axle: 118,
      caliper_mount_front: 30,
      caliper_mount_rear: 30,
      variator_nut: 83,
      clutch_bell_nut: 49,
      src: "manual",
      verified: true
    }
  },

  // =========================================================================
  // 5. HONDA XRM 125 FI (Dual Sport / Motard / DSX)
  // =========================================================================
  {
    id: "honda-xrm-125-fi",
    name: "Honda XRM 125 FI (PH)",
    years: "2020-2026",
    category: "Underbone",
    cooling: "Air-Cooled",
    brand: "Honda",
    engine: {
      displacement_cc: 124.8,
      type: "4-stroke SOHC 2-valve PGM-FI",
      bore_stroke_mm: "52.4 x 57.9",
      compression: "9.3:1",
      valve_in_mm: "0.10-0.14",
      valve_ex_mm: "0.14-0.18",
      valve_interval_km: 8000,
      src: "manual",
      verified: true
    },
    s1_engine_oil: {
      grade: "Honda 4T SL 10W-30 MA Motorcycle Oil",
      drain_ml: 800,
      filter_ml: 800,
      overhaul_ml: 1000,
      interval_km: 3000,
      severe_km: 2000,
      src: "manual",
      verified: true
    },
    s2_filtration: {
      type: "Centrifugal oil filter rotor & wire strainer",
      part_no: "15421-KPL-900",
      drain_bolt: "M12 x 1.5",
      drain_washer: "90407-259-000",
      filter_o_ring: null,
      cover_torque_nm: null,
      src: "manual",
      verified: true
    },
    s3_final_drive: {
      kind: "drive_chain",
      chain_spec: "428-108L",
      freeplay_mm: "25-35",
      front_sprocket: "23801-KWW-740 (14T)",
      rear_sprocket: "41201-KWW-740 (36T)",
      interval_km: 1000,
      src: "manual",
      verified: true
    },
    s4_spark_plug: {
      ngk: "CPR6EA-9",
      ygp: "31916-KRM-841",
      gap_mm: "0.8-0.9",
      torque_nm: 16,
      interval_km: 8000,
      src: "manual",
      verified: true
    },
    s5_air_cleaner: {
      part_no: "17210-KWW-640",
      type: "Viscous Paper Element",
      interval_km: 12000,
      src: "manual",
      verified: true
    },
    s6_duct_filter: null,
    s7_cvt_belt: null,
    s8_rollers: null,
    s9_sliders: null,
    s10_clutch: {
      kind: "automatic_centrifugal_and_wet_multiplate",
      friction_plates: "22201-KWW-741",
      steel_plates: "22321-KWW-741",
      springs: "22401-KWW-741",
      lever_freeplay_mm: null,
      src: "manual",
      verified: true
    },
    s11_front_brake: {
      pads: "06455-KPP-901",
      seal_kit: "06451-GE2-405",
      pistons: 1,
      disc_min_mm: 3.0,
      src: "manual",
      verified: true
    },
    s12_rear_brake: {
      type: "Drum (DS/Motard) / Disc (DSX)",
      part_no: "43130-KFL-850",
      drum_max_id_mm: 111,
      src: "manual",
      verified: true
    },
    s13_cooling: {
      liquid_cooled: false,
      radiator_ml: null,
      reservoir_ml: null,
      cap: null,
      water_pump_seal: null,
      src: "manual",
      verified: true
    },
    s14_fork: {
      oil_grade: "Honda Ultra Cushion Fork Oil 10W",
      oil_ml_per_leg: 65,
      oil_seal: "51490-KGH-901",
      dust_seal: "51425-KGH-901",
      src: "manual",
      verified: true
    },
    s15_bearings: {
      front_left: "91052-K03-H01 (6201-2RS)",
      front_right: "91052-K03-H01 (6201-2RS)",
      rear_left: "91053-KWW-741 (6202-2RS)",
      rear_right: "91054-KWW-741 (6301-2RS)",
      seals: "90754-GC8-005",
      src: "manual",
      verified: true
    },
    s16_steering: {
      upper: "53211-GN5-900",
      lower: "53212-GN5-900",
      ball_set: "06531-GBG-B20",
      src: "manual",
      verified: true
    },
    s17_electrical: {
      battery: "YTZ5S (12V 3.5Ah)",
      fuses: {
        main: "15A",
        sub: "10A",
        ecu: "10A",
        signal: "10A"
      },
      src: "manual",
      verified: true
    },
    s18_tires: {
      front: "70/90-17 M/C 38P",
      rear: "80/90-17 M/C 50P",
      psi: {
        front_solo: 29,
        rear_solo: 33,
        front_pillion: 29,
        rear_pillion: 36
      },
      src: "manual",
      verified: true
    },
    torque_nm: {
      drain_bolt: 24,
      filter_cover: null,
      spark_plug: 16,
      front_axle: 40,
      rear_axle: 59,
      caliper_mount_front: 30,
      caliper_mount_rear: 30,
      variator_nut: null,
      clutch_bell_nut: null,
      src: "manual",
      verified: true
    }
  },

  // =========================================================================
  // 6. HONDA WINNER X 150 (PH)
  // =========================================================================
  {
    id: "honda-winner-x-150",
    name: "Honda Winner X 150 (PH)",
    years: "2024-2026",
    category: "Underbone",
    cooling: "Liquid-Cooled",
    brand: "Honda",
    engine: {
      displacement_cc: 149.1,
      type: "4-stroke DOHC 4-valve Liquid-Cooled Single",
      bore_stroke_mm: "57.3 x 57.8",
      compression: "11.3:1",
      valve_in_mm: "0.14-0.18",
      valve_ex_mm: "0.22-0.26",
      valve_interval_km: 12000,
      src: "manual",
      verified: true
    },
    s1_engine_oil: {
      grade: "Honda 4T SL 10W-30 MA Fully Synthetic",
      drain_ml: 1100,
      filter_ml: 1100,
      overhaul_ml: 1300,
      interval_km: 3000,
      severe_km: 2000,
      src: "manual",
      verified: true
    },
    s2_filtration: {
      type: "Internal wire mesh strainer screen (no paper cartridge)",
      part_no: "15421-K56-N00",
      drain_bolt: "M12 x 1.5",
      drain_washer: "90407-259-000",
      filter_o_ring: null,
      cover_torque_nm: null,
      src: "manual",
      verified: true
    },
    s3_final_drive: {
      kind: "drive_chain",
      chain_spec: "DID 428HPO-120L O-Ring",
      freeplay_mm: "25-35",
      front_sprocket: "23801-K56-N00 (15T)",
      rear_sprocket: "41201-K56-N00 (44T)",
      interval_km: 1000,
      src: "manual",
      verified: true
    },
    s4_spark_plug: {
      ngk: "MR9C-9N",
      ygp: "31919-K25-601",
      gap_mm: "0.8-0.9",
      torque_nm: 12,
      interval_km: 8000,
      src: "manual",
      verified: true
    },
    s5_air_cleaner: {
      part_no: "17210-K56-V50",
      type: "Viscous Paper Element",
      interval_km: 12000,
      src: "manual",
      verified: true
    },
    s6_duct_filter: null,
    s7_cvt_belt: null,
    s8_rollers: null,
    s9_sliders: null,
    s10_clutch: {
      kind: "assist_and_slipper manual wet multiplate",
      friction_plates: "22201-K56-N01",
      steel_plates: "22321-K56-N01",
      springs: "22401-K56-N01",
      lever_freeplay_mm: "10-20",
      src: "manual",
      verified: true
    },
    s11_front_brake: {
      pads: "06455-K56-N01",
      seal_kit: "06451-GE2-405",
      pistons: 1,
      disc_min_mm: 3.5,
      src: "manual",
      verified: true
    },
    s12_rear_brake: {
      type: "Hydraulic Single Disc",
      part_no: "06435-K56-N01",
      seal_kit: "06431-MA3-405",
      disc_min_mm: 3.5,
      src: "manual",
      verified: true
    },
    s13_cooling: {
      liquid_cooled: true,
      radiator_ml: 500,
      reservoir_ml: 150,
      cap: "19045-K56-N01",
      water_pump_seal: "19217-PA5-003",
      interval_km: 24000,
      src: "manual",
      verified: true
    },
    s14_fork: {
      oil_grade: "Honda Ultra Cushion Fork Oil 10W",
      oil_ml_per_leg: 65,
      oil_seal: "51490-KGH-901",
      dust_seal: "51425-KGH-901",
      src: "manual",
      verified: true
    },
    s15_bearings: {
      front_left: "91052-K03-H01 (6201-2RS)",
      front_right: "91052-K03-H01 (6201-2RS)",
      rear_left: "91053-KWW-741 (6202-2RS)",
      rear_right: "91054-KWW-741 (6301-2RS)",
      seals: "90754-GC8-005",
      src: "manual",
      verified: true
    },
    s16_steering: {
      upper: "53211-GN5-900",
      lower: "53212-GN5-900",
      ball_set: "06531-GBG-B20",
      src: "manual",
      verified: true
    },
    s17_electrical: {
      battery: "YTZ6V (12V 5.0Ah MF)",
      fuses: {
        main: "20A",
        sub: "10A",
        abs: "30A (ABS model)",
        ecu: "10A",
        smart_key: "10A",
        signal: "10A"
      },
      src: "manual",
      verified: true
    },
    s18_tires: {
      front: "90/80-17 M/C 46P (Tubeless)",
      rear: "120/70-17 M/C 58P (Tubeless)",
      psi: {
        front_solo: 29,
        rear_solo: 33,
        front_pillion: 29,
        rear_pillion: 36
      },
      src: "manual",
      verified: true
    },
    torque_nm: {
      drain_bolt: 24,
      filter_cover: null,
      spark_plug: 12,
      front_axle: 40,
      rear_axle: 59,
      caliper_mount_front: 30,
      caliper_mount_rear: 30,
      variator_nut: null,
      clutch_bell_nut: null,
      src: "manual",
      verified: true
    }
  },

  // =========================================================================
  // 7. HONDA CB300R NEO SPORTS CAFE (PH)
  // =========================================================================
  {
    id: "honda-cb300r",
    name: "Honda CB300R Neo Sports Cafe (PH)",
    years: "2020-2026",
    category: "Sport / Naked",
    cooling: "Liquid-Cooled",
    brand: "Honda",
    engine: {
      displacement_cc: 286.0,
      type: "4-stroke DOHC 4-valve Liquid-Cooled Single",
      bore_stroke_mm: "76.0 x 63.0",
      compression: "10.7:1",
      valve_in_mm: "0.13-0.19",
      valve_ex_mm: "0.24-0.30",
      valve_interval_km: 24000,
      src: "manual",
      verified: true
    },
    s1_engine_oil: {
      grade: "Honda 4T SL 10W-30 MA Fully Synthetic",
      drain_ml: 1400,
      filter_ml: 1500,
      overhaul_ml: 1800,
      interval_km: 6000,
      severe_km: 3000,
      src: "manual",
      verified: true
    },
    s2_filtration: {
      type: "Replaceable Paper Cartridge Filter",
      part_no: "15410-KYJ-902",
      drain_bolt: "M12 x 1.5",
      drain_washer: "94109-12000",
      filter_o_ring: "91302-PA9-003",
      cover_torque_nm: 12,
      src: "manual",
      verified: true
    },
    s3_final_drive: {
      kind: "drive_chain",
      chain_spec: "DID 520VF-108L O-Ring",
      freeplay_mm: "25-35",
      front_sprocket: "23801-K33-D00 (14T)",
      rear_sprocket: "41201-K0A-E10 (36T)",
      interval_km: 1000,
      src: "manual",
      verified: true
    },
    s4_spark_plug: {
      ngk: "SIMR8A9 (Iridium)",
      ygp: "31916-KZZ-901",
      gap_mm: "0.8-0.9",
      torque_nm: 16,
      interval_km: 24000,
      src: "manual",
      verified: true
    },
    s5_air_cleaner: {
      part_no: "17220-K0A-E10",
      type: "Viscous Paper Element",
      interval_km: 12000,
      src: "manual",
      verified: true
    },
    s6_duct_filter: null,
    s7_cvt_belt: null,
    s8_rollers: null,
    s9_sliders: null,
    s10_clutch: {
      kind: "assist_and_slipper manual wet multiplate",
      friction_plates: "22201-K33-D01",
      steel_plates: "22321-K33-D01",
      springs: "22401-K0A-E11",
      lever_freeplay_mm: "10-20",
      src: "manual",
      verified: true
    },
    s11_front_brake: {
      pads: "06455-K0A-E11 (Radial 4-Piston Nissin)",
      seal_kit: "06451-MGE-003",
      pistons: 4,
      disc_min_mm: 4.0,
      src: "manual",
      verified: true
    },
    s12_rear_brake: {
      type: "Hydraulic Single Disc",
      part_no: "06435-K0A-E11",
      seal_kit: "06431-MA3-405",
      disc_min_mm: 4.0,
      src: "manual",
      verified: true
    },
    s13_cooling: {
      liquid_cooled: true,
      radiator_ml: 1000,
      reservoir_ml: 200,
      cap: "19045-MY3-621",
      water_pump_seal: "19217-MAL-300",
      interval_km: 24000,
      src: "manual",
      verified: true
    },
    s14_fork: {
      oil_grade: "Showa SS-47 Fork Oil 10W (41mm Inverted)",
      oil_ml_per_leg: 468,
      oil_seal: "51490-K0A-E11",
      dust_seal: "51425-K0A-E11",
      src: "manual",
      verified: true
    },
    s15_bearings: {
      front_left: "91051-KZZ-901 (6003-2RS)",
      front_right: "91051-KZZ-901 (6003-2RS)",
      rear_left: "91052-KZZ-901 (6204-2RS)",
      rear_right: "91052-KZZ-901 (6204-2RS)",
      seals: "91252-KZZ-901",
      src: "manual",
      verified: true
    },
    s16_steering: {
      upper: "91015-KT8-005",
      lower: "91016-KT8-005",
      ball_set: "Taper Roller Bearings",
      src: "manual",
      verified: true
    },
    s17_electrical: {
      battery: "YTX7L-BS (12V 6.0Ah)",
      fuses: {
        main: "30A",
        sub: "10A",
        abs: "30A",
        ecu: "10A",
        backup: "10A"
      },
      src: "manual",
      verified: true
    },
    s18_tires: {
      front: "110/70R-17 M/C 54H (Radial Tubeless)",
      rear: "150/60R-17 M/C 66H (Radial Tubeless)",
      psi: {
        front_solo: 29,
        rear_solo: 33,
        front_pillion: 29,
        rear_pillion: 36
      },
      src: "manual",
      verified: true
    },
    torque_nm: {
      drain_bolt: 24,
      filter_cover: 12,
      spark_plug: 16,
      front_axle: 59,
      front_axle_pinch_bolt: 22,
      rear_axle: 88,
      caliper_mount_front: 30,
      caliper_mount_rear: 30,
      variator_nut: null,
      clutch_bell_nut: null,
      src: "manual",
      verified: true
    }
  },

  // =========================================================================
  // 8. HONDA REBEL 300 (CMX300) (PH)
  // =========================================================================
  {
    id: "honda-rebel-300",
    name: "Honda Rebel 300 / CMX300 (PH)",
    years: "2020-2026",
    category: "Cruiser",
    cooling: "Liquid-Cooled",
    brand: "Honda",
    engine: {
      displacement_cc: 286.0,
      type: "4-stroke DOHC 4-valve Liquid-Cooled Single Cruiser",
      bore_stroke_mm: "76.0 x 63.0",
      compression: "10.7:1",
      valve_in_mm: "0.13-0.19",
      valve_ex_mm: "0.24-0.30",
      valve_interval_km: 24000,
      src: "manual",
      verified: true
    },
    s1_engine_oil: {
      grade: "Honda 4T SL 10W-30 MA Fully Synthetic",
      drain_ml: 1400,
      filter_ml: 1500,
      overhaul_ml: 1800,
      interval_km: 6000,
      severe_km: 3000,
      src: "manual",
      verified: true
    },
    s2_filtration: {
      type: "Replaceable Paper Cartridge Filter",
      part_no: "15410-KYJ-902",
      drain_bolt: "M12 x 1.5",
      drain_washer: "94109-12000",
      filter_o_ring: "91302-PA9-003",
      cover_torque_nm: 12,
      src: "manual",
      verified: true
    },
    s3_final_drive: {
      kind: "drive_chain",
      chain_spec: "DID 520VF-106L O-Ring",
      freeplay_mm: "25-35",
      front_sprocket: "23801-K33-D00 (14T)",
      rear_sprocket: "41201-K87-A00 (36T)",
      interval_km: 1000,
      src: "manual",
      verified: true
    },
    s4_spark_plug: {
      ngk: "SIMR8A9 (Iridium)",
      ygp: "31916-KZZ-901",
      gap_mm: "0.8-0.9",
      torque_nm: 16,
      interval_km: 24000,
      src: "manual",
      verified: true
    },
    s5_air_cleaner: {
      part_no: "17220-K87-A00",
      type: "Viscous Paper Element",
      interval_km: 12000,
      src: "manual",
      verified: true
    },
    s6_duct_filter: null,
    s7_cvt_belt: null,
    s8_rollers: null,
    s9_sliders: null,
    s10_clutch: {
      kind: "assist_and_slipper manual wet multiplate",
      friction_plates: "22201-K33-D01",
      steel_plates: "22321-K33-D01",
      springs: "22401-K87-A01",
      lever_freeplay_mm: "10-20",
      src: "manual",
      verified: true
    },
    s11_front_brake: {
      pads: "06455-K87-A01 (2-Piston Nissin)",
      seal_kit: "06451-MA7-405",
      pistons: 2,
      disc_min_mm: 4.0,
      src: "manual",
      verified: true
    },
    s12_rear_brake: {
      type: "Hydraulic Single Disc",
      part_no: "06435-K87-A01",
      seal_kit: "06431-MA3-405",
      disc_min_mm: 4.0,
      src: "manual",
      verified: true
    },
    s13_cooling: {
      liquid_cooled: true,
      radiator_ml: 1100,
      reservoir_ml: 220,
      cap: "19045-MY3-621",
      water_pump_seal: "19217-MAL-300",
      interval_km: 24000,
      src: "manual",
      verified: true
    },
    s14_fork: {
      oil_grade: "Honda Ultra Cushion Fork Oil 10W (41mm Conventional)",
      oil_ml_per_leg: 460,
      oil_seal: "51490-K87-A01",
      dust_seal: "51425-K87-A01",
      src: "manual",
      verified: true
    },
    s15_bearings: {
      front_left: "91051-KZZ-901 (6003-2RS)",
      front_right: "91051-KZZ-901 (6003-2RS)",
      rear_left: "91052-KZZ-901 (6204-2RS)",
      rear_right: "91052-KZZ-901 (6204-2RS)",
      seals: "91252-KZZ-901",
      src: "manual",
      verified: true
    },
    s16_steering: {
      upper: "91015-KT8-005",
      lower: "91016-KT8-005",
      ball_set: "Taper Roller Bearings",
      src: "manual",
      verified: true
    },
    s17_electrical: {
      battery: "YTX7L-BS (12V 6.0Ah)",
      fuses: {
        main: "30A",
        sub: "10A",
        abs: "30A",
        ecu: "10A",
        backup: "10A"
      },
      src: "manual",
      verified: true
    },
    s18_tires: {
      front: "130/90-16 M/C 67H (Tubeless)",
      rear: "150/80-16 M/C 71H (Tubeless)",
      psi: {
        front_solo: 29,
        rear_solo: 29,
        front_pillion: 29,
        rear_pillion: 29
      },
      src: "manual",
      verified: true
    },
    torque_nm: {
      drain_bolt: 24,
      filter_cover: 12,
      spark_plug: 16,
      front_axle: 59,
      front_axle_pinch_bolt: 22,
      rear_axle: 88,
      caliper_mount_front: 30,
      caliper_mount_rear: 30,
      variator_nut: null,
      clutch_bell_nut: null,
      src: "manual",
      verified: true
    }
  },

  // =========================================================================
  // 9. HONDA CRF300L / RALLY (PH)
  // =========================================================================
  {
    id: "honda-crf300l",
    name: "Honda CRF300L / Rally (PH)",
    years: "2021-2026",
    category: "Dual-Sport",
    cooling: "Liquid-Cooled",
    brand: "Honda",
    engine: {
      displacement_cc: 286.0,
      type: "4-stroke DOHC 4-valve Liquid-Cooled Single",
      bore_stroke_mm: "76.0 x 63.0",
      compression: "10.7:1",
      valve_in_mm: "0.13-0.19",
      valve_ex_mm: "0.24-0.30",
      valve_interval_km: 24000,
      src: "manual",
      verified: true
    },
    s1_engine_oil: {
      grade: "Honda 4T SL 10W-30 MA Fully Synthetic",
      drain_ml: 1400,
      filter_ml: 1500,
      overhaul_ml: 1800,
      interval_km: 6000,
      severe_km: 3000,
      src: "manual",
      verified: true
    },
    s2_filtration: {
      type: "Replaceable Paper Cartridge Filter",
      part_no: "15410-KYJ-902",
      drain_bolt: "M12 x 1.5",
      drain_washer: "94109-12000",
      filter_o_ring: "91302-PA9-003",
      cover_torque_nm: 12,
      src: "manual",
      verified: true
    },
    s3_final_drive: {
      kind: "drive_chain",
      chain_spec: "DID 520VF-106L O-Ring",
      freeplay_mm: "25-35",
      front_sprocket: "23801-K1T-E10 (14T)",
      rear_sprocket: "41201-K1T-E10 (40T)",
      interval_km: 1000,
      src: "manual",
      verified: true
    },
    s4_spark_plug: {
      ngk: "SIMR8A9 (Iridium)",
      ygp: "31916-KZZ-901",
      gap_mm: "0.8-0.9",
      torque_nm: 16,
      interval_km: 24000,
      src: "manual",
      verified: true
    },
    s5_air_cleaner: {
      part_no: "17220-K1T-E10",
      type: "Viscous Paper Element",
      interval_km: 12000,
      src: "manual",
      verified: true
    },
    s6_duct_filter: null,
    s7_cvt_belt: null,
    s8_rollers: null,
    s9_sliders: null,
    s10_clutch: {
      kind: "assist_and_slipper",
      friction_plates: "22201-KZZ-901",
      steel_plates: "22321-KZZ-901",
      springs: "22401-K1T-E10",
      lever_freeplay_mm: "10-20",
      src: "manual",
      verified: true
    },
    s11_front_brake: {
      pads: "06455-KZZ-901",
      seal_kit: "06451-MA7-405",
      pistons: 2,
      disc_min_mm: 3.0,
      src: "manual",
      verified: true
    },
    s12_rear_brake: {
      type: "Hydraulic Wave Disc",
      part_no: "06435-KZZ-901",
      seal_kit: "06431-MA3-405",
      disc_min_mm: 4.0,
      src: "manual",
      verified: true
    },
    s13_cooling: {
      liquid_cooled: true,
      radiator_ml: 1100,
      reservoir_ml: 220,
      cap: "19045-MY3-621",
      water_pump_seal: "19217-MAL-300",
      interval_km: 24000,
      src: "manual",
      verified: true
    },
    s14_fork: {
      oil_grade: "Honda Ultra Cushion Fork Oil 10W (Inverted)",
      oil_ml_per_leg: 540,
      oil_seal: "51490-KZZ-901",
      dust_seal: "51425-KZZ-901",
      src: "manual",
      verified: true
    },
    s15_bearings: {
      front_left: "91051-KZZ-901 (6003-2RS)",
      front_right: "91051-KZZ-901 (6003-2RS)",
      rear_left: "91052-KZZ-901 (6204-2RS)",
      rear_right: "91052-KZZ-901 (6204-2RS)",
      seals: "91252-KZZ-901",
      src: "manual",
      verified: true
    },
    s16_steering: {
      upper: "91015-KT8-005",
      lower: "91016-KT8-005",
      ball_set: "Taper Roller Bearings",
      src: "manual",
      verified: true
    },
    s17_electrical: {
      battery: "YTX7L-BS (12V 6.0Ah)",
      fuses: {
        main: "30A",
        sub: "10A",
        abs: "30A",
        ecu: "10A",
        backup: "10A"
      },
      src: "manual",
      verified: true
    },
    s18_tires: {
      front: "80/100-21 M/C 51P (Tube)",
      rear: "120/80-18 M/C 62P (Tube)",
      psi: {
        front_solo: 22,
        rear_solo: 22,
        front_pillion: 22,
        rear_pillion: 25
      },
      src: "manual",
      verified: true
    },
    torque_nm: {
      drain_bolt: 24,
      filter_cover: 12,
      spark_plug: 16,
      front_axle: 44,
      front_axle_pinch_bolt: 20,
      rear_axle: 88,
      caliper_mount_front: 30,
      caliper_mount_rear: 30,
      variator_nut: null,
      clutch_bell_nut: null,
      src: "manual",
      verified: true
    }
  }
];

if (typeof LIST !== 'undefined') {
  HONDA_LIST.forEach(m => LIST.push(m));
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HONDA_LIST };
}
