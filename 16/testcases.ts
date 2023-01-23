export const T_Input = {
  data: `Valve PL has flow rate=4; tunnels lead to valves LI, GD, LB, IA, LZ
  Valve LB has flow rate=0; tunnels lead to valves PL, VR
  Valve QS has flow rate=0; tunnels lead to valves MG, YL
  Valve RM has flow rate=17; tunnels lead to valves OQ, UN
  Valve QM has flow rate=0; tunnels lead to valves RD, RO
  Valve LI has flow rate=0; tunnels lead to valves AF, PL
  Valve VR has flow rate=0; tunnels lead to valves YL, LB
  Valve SJ has flow rate=0; tunnels lead to valves RO, TU
  Valve PZ has flow rate=14; tunnels lead to valves KU, HE
  Valve OQ has flow rate=0; tunnels lead to valves RM, OC
  Valve YT has flow rate=0; tunnels lead to valves PX, IO
  Valve TU has flow rate=5; tunnels lead to valves WS, GZ, MG, SJ, GD
  Valve PC has flow rate=7; tunnels lead to valves RY, WK, OG, PD
  Valve HE has flow rate=0; tunnels lead to valves PZ, OG
  Valve IO has flow rate=20; tunnels lead to valves YT, TX
  Valve OC has flow rate=19; tunnels lead to valves OQ, PD
  Valve AA has flow rate=0; tunnels lead to valves NY, IA, WK, FU, NU
  Valve UN has flow rate=0; tunnels lead to valves JY, RM
  Valve NY has flow rate=0; tunnels lead to valves AA, WA
  Valve HU has flow rate=0; tunnels lead to valves WA, RC
  Valve GD has flow rate=0; tunnels lead to valves PL, TU
  Valve WK has flow rate=0; tunnels lead to valves PC, AA
  Valve RY has flow rate=0; tunnels lead to valves PV, PC
  Valve GX has flow rate=0; tunnels lead to valves QX, YL
  Valve RC has flow rate=0; tunnels lead to valves HU, RL
  Valve TX has flow rate=0; tunnels lead to valves IO, WA
  Valve PV has flow rate=12; tunnel leads to valve RY
  Valve PP has flow rate=25; tunnel leads to valve KU
  Valve RL has flow rate=9; tunnel leads to valve RC
  Valve OG has flow rate=0; tunnels lead to valves PC, HE
  Valve PD has flow rate=0; tunnels lead to valves OC, PC
  Valve RO has flow rate=8; tunnels lead to valves SJ, QX, MO, QM
  Valve QX has flow rate=0; tunnels lead to valves GX, RO
  Valve WA has flow rate=6; tunnels lead to valves TX, AF, RG, HU, NY
  Valve PX has flow rate=0; tunnels lead to valves YT, OE
  Valve GZ has flow rate=0; tunnels lead to valves TU, FU
  Valve RG has flow rate=0; tunnels lead to valves OE, WA
  Valve MG has flow rate=0; tunnels lead to valves QS, TU
  Valve AF has flow rate=0; tunnels lead to valves WA, LI
  Valve WS has flow rate=0; tunnels lead to valves ND, TU
  Valve OE has flow rate=18; tunnels lead to valves RG, PX
  Valve YL has flow rate=3; tunnels lead to valves VR, GX, QS, NU
  Valve ND has flow rate=0; tunnels lead to valves JY, WS
  Valve FU has flow rate=0; tunnels lead to valves GZ, AA
  Valve NU has flow rate=0; tunnels lead to valves YL, AA
  Valve JY has flow rate=11; tunnels lead to valves UN, RD, ND
  Valve IA has flow rate=0; tunnels lead to valves AA, PL
  Valve KU has flow rate=0; tunnels lead to valves PZ, PP
  Valve RD has flow rate=0; tunnels lead to valves JY, QM
  Valve MO has flow rate=0; tunnels lead to valves RO, LZ
  Valve LZ has flow rate=0; tunnels lead to valves PL, MO`,
  p1: {
    solution: 1474,
    description: "",
  },
  p2: {
    solution: 2100,
    description: ``,
  },
}
export const T_Example = {
  data: `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
  Valve BB has flow rate=13; tunnels lead to valves CC, AA
  Valve CC has flow rate=2; tunnels lead to valves DD, BB
  Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
  Valve EE has flow rate=3; tunnels lead to valves FF, DD
  Valve FF has flow rate=0; tunnels lead to valves EE, GG
  Valve GG has flow rate=0; tunnels lead to valves FF, HH
  Valve HH has flow rate=22; tunnel leads to valve GG
  Valve II has flow rate=0; tunnels lead to valves AA, JJ
  Valve JJ has flow rate=21; tunnel leads to valve II`,
  p1: {
    solution: 1651,
    description: "",
  },
  p2: {
    solution: 1707,
    description: ``,
  },
}
export const T1 = {
  data: `Valve LA has flow rate=22; tunnels lead to valves KA, MA
  Valve MA has flow rate=24; tunnels lead to valves LA, NA
  Valve NA has flow rate=26; tunnels lead to valves MA, OA
  Valve OA has flow rate=28; tunnels lead to valves NA, PA
  Valve PA has flow rate=30; tunnels lead to valves OA
  Valve AA has flow rate=0; tunnels lead to valves BA
  Valve BA has flow rate=2; tunnels lead to valves AA, CA
  Valve CA has flow rate=4; tunnels lead to valves BA, DA
  Valve DA has flow rate=6; tunnels lead to valves CA, EA
  Valve EA has flow rate=8; tunnels lead to valves DA, FA
  Valve FA has flow rate=10; tunnels lead to valves EA, GA
  Valve GA has flow rate=12; tunnels lead to valves FA, HA
  Valve HA has flow rate=14; tunnels lead to valves GA, IA
  Valve IA has flow rate=16; tunnels lead to valves HA, JA
  Valve JA has flow rate=18; tunnels lead to valves IA, KA
  Valve KA has flow rate=20; tunnels lead to valves JA, LA`,
  p1: {
    solution: 2640,
    description: "|AA|FA|GA|HA|IA|JA|KA|LA|MA|NA|OA|PA",
  },
  p2: {
    solution: 2670,
    description: `1240 |AA|DA|EA|FA|GA|HA|IA|JA|CA
    1430 |AA|KA|LA|MA|NA|OA|PA`,
  },
}
export const T2 = {
  data: `Valve AA has flow rate=0; tunnels lead to valves BA
  Valve BA has flow rate=1; tunnels lead to valves AA, CA
  Valve CA has flow rate=4; tunnels lead to valves BA, DA
  Valve DA has flow rate=9; tunnels lead to valves CA, EA
  Valve EA has flow rate=16; tunnels lead to valves DA, FA
  Valve FA has flow rate=25; tunnels lead to valves EA, GA
  Valve GA has flow rate=36; tunnels lead to valves FA, HA
  Valve HA has flow rate=49; tunnels lead to valves GA, IA
  Valve IA has flow rate=64; tunnels lead to valves HA, JA
  Valve JA has flow rate=81; tunnels lead to valves IA, KA
  Valve KA has flow rate=100; tunnels lead to valves JA, LA
  Valve LA has flow rate=121; tunnels lead to valves KA, MA
  Valve MA has flow rate=144; tunnels lead to valves LA, NA
  Valve NA has flow rate=169; tunnels lead to valves MA, OA
  Valve OA has flow rate=196; tunnels lead to valves NA, PA
  Valve PA has flow rate=225; tunnels lead to valves OA`,
  p1: {
    solution: 13468,
    description: "|AA|IA|JA|KA|LA|MA|NA|OA|PA",
  },
  p2: {
    solution: 12887,
    description: `4857 |AA|FA|GA|HA|IA|JA|KA|EA|DA
    8030 |AA|LA|MA|NA|OA|PA`,
  },
}
export const T3 = {
  data: `Valve BA has flow rate=2; tunnels lead to valves AA, CA
  Valve CA has flow rate=10; tunnels lead to valves BA, DA
  Valve DA has flow rate=2; tunnels lead to valves CA, EA
  Valve EA has flow rate=10; tunnels lead to valves DA, FA
  Valve FA has flow rate=2; tunnels lead to valves EA, GA
  Valve GA has flow rate=10; tunnels lead to valves FA, HA
  Valve HA has flow rate=2; tunnels lead to valves GA, IA
  Valve IA has flow rate=10; tunnels lead to valves HA, JA
  Valve JA has flow rate=2; tunnels lead to valves IA, KA
  Valve KA has flow rate=10; tunnels lead to valves JA, LA
  Valve LA has flow rate=2; tunnels lead to valves KA, MA
  Valve MA has flow rate=10; tunnels lead to valves LA, NA
  Valve NA has flow rate=2; tunnels lead to valves MA, OA
  Valve OA has flow rate=10; tunnels lead to valves NA, PA
  Valve PA has flow rate=2; tunnels lead to valves OA, AA
  Valve AA has flow rate=0; tunnels lead to valves BA, PA`,
  p1: {
    solution: 1288,
    description: "|AA|CA|EA|GA|IA|KA|MA|NA|OA|PA|BA",
  },
  p2: {
    solution: 1484,
    description: `794 |AA|CA|EA|GA|IA|HA|FA|DA
    690 |AA|OA|MA|KA|JA|LA|NA|PA|BA`,
  },
}
export const T4 = {
  data: `Valve AK has flow rate=100; tunnels lead to valves AJ, AW, AX, AY, AZ
  Valve AW has flow rate=10; tunnels lead to valves AK
  Valve AX has flow rate=10; tunnels lead to valves AK
  Valve AY has flow rate=10; tunnels lead to valves AK
  Valve AZ has flow rate=10; tunnels lead to valves AK
  Valve BB has flow rate=0; tunnels lead to valves AA, BC
  Valve BC has flow rate=0; tunnels lead to valves BB, BD
  Valve BD has flow rate=0; tunnels lead to valves BC, BE
  Valve BE has flow rate=0; tunnels lead to valves BD, BF
  Valve BF has flow rate=0; tunnels lead to valves BE, BG
  Valve BG has flow rate=0; tunnels lead to valves BF, BH
  Valve BH has flow rate=0; tunnels lead to valves BG, BI
  Valve BI has flow rate=0; tunnels lead to valves BH, BJ
  Valve BJ has flow rate=0; tunnels lead to valves BI, BK
  Valve BK has flow rate=100; tunnels lead to valves BJ, BW, BX, BY, BZ
  Valve BW has flow rate=10; tunnels lead to valves BK
  Valve BX has flow rate=10; tunnels lead to valves BK
  Valve BY has flow rate=10; tunnels lead to valves BK
  Valve BZ has flow rate=10; tunnels lead to valves BK
  Valve CB has flow rate=0; tunnels lead to valves AA, CC
  Valve CC has flow rate=0; tunnels lead to valves CB, CD
  Valve CD has flow rate=0; tunnels lead to valves CC, CE
  Valve CE has flow rate=0; tunnels lead to valves CD, CF
  Valve CF has flow rate=0; tunnels lead to valves CE, CG
  Valve CG has flow rate=0; tunnels lead to valves CF, CH
  Valve CH has flow rate=0; tunnels lead to valves CG, CI
  Valve CI has flow rate=0; tunnels lead to valves CH, CJ
  Valve CJ has flow rate=0; tunnels lead to valves CI, CK
  Valve CK has flow rate=100; tunnels lead to valves CJ, CW, CX, CY, CZ
  Valve CW has flow rate=10; tunnels lead to valves CK
  Valve CX has flow rate=10; tunnels lead to valves CK
  Valve CY has flow rate=10; tunnels lead to valves CK
  Valve CZ has flow rate=10; tunnels lead to valves CK
  Valve AA has flow rate=0; tunnels lead to valves AB, BB, CB
  Valve AB has flow rate=0; tunnels lead to valves AA, AC
  Valve AC has flow rate=0; tunnels lead to valves AB, AD
  Valve AD has flow rate=0; tunnels lead to valves AC, AE
  Valve AE has flow rate=0; tunnels lead to valves AD, AF
  Valve AF has flow rate=0; tunnels lead to valves AE, AG
  Valve AG has flow rate=0; tunnels lead to valves AF, AH
  Valve AH has flow rate=0; tunnels lead to valves AG, AI
  Valve AI has flow rate=0; tunnels lead to valves AH, AJ
  Valve AJ has flow rate=0; tunnels lead to valves AI, AK`,
  p1: {
    solution: 2400,
    description: "|AA|CK|CX|CZ|CY|CW",
  },
  p2: {
    solution: 3680,
    description: `1840 |AA|AK|AW|AX|AY|AZ
    1840 |AA|CK|CZ|CX|CY|CW`,
  },
}

export const T5 = {
  data: `Valve AA has flow rate=0; tunnels lead to valves BB
  Valve BB has flow rate=10; tunnels lead to valves AA, CC
  Valve CC has flow rate=10; tunnels lead to valves BB, DD
  Valve DD has flow rate=10; tunnels lead to valves CC, EE
  Valve EE has flow rate=10; tunnels lead to valves DD`,
  p1: {
    solution: 1288,
    description: "|AA|CA|EA|GA|IA|KA|MA|NA|OA|PA|BA",
  },
  p2: {
    solution: 1484,
    description: `794 |AA|CA|EA|GA|IA|HA|FA|DA
    690 |AA|OA|MA|KA|JA|LA|NA|PA|BA`,
  },
}
