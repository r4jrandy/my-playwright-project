export default class TestData {
  static makeAppointmentData() {
    return [
      {
        testId: "TC001",
        facility: "Tokyo CURA Healthcare Center",
        applyForHospitalReadmission: true,
        program: "Medicare",
        visitDate: "2024/06/15",
        comment: "This is a test comment for TC001.",
      },
      {
        testId: "TC002",
        facility: "Hongkong CURA Healthcare Center",
        applyForHospitalReadmission: false,
        program: "Medicaid",
        visitDate: "2024/06/20",
        comment: "This is a test comment for TC002.",
      },
      {
        testId: "TC003",
        facility: "Seoul CURA Healthcare Center",
        applyForHospitalReadmission: true,
        program: "None",
        visitDate: "2024/06/25",
        comment: "This is a test comment for TC003.",
      },
    ];
  }
}
