// 경력 구간 추가 버튼 클릭 시 실행
// 경력 추가 버튼 클릭 시 경력 구간 추가
document.getElementById("add-period").addEventListener("click", () => {
    const periodDiv = document.createElement("div");
    periodDiv.classList.add("career-period");
    periodDiv.innerHTML = `
        <label>경력 시작일:</label>
        <input type="date" class="period-start">
        <label>경력 종료일:</label>
        <input type="date" class="period-end">
    `;
    document.getElementById("career-periods").appendChild(periodDiv);
});

// 휴직 추가 버튼 클릭 시 휴직 구간 추가
document.getElementById("add-leave").addEventListener("click", () => {
    const leaveDiv = document.createElement("div");
    leaveDiv.classList.add("leave-period");
    leaveDiv.innerHTML = `
        <label>휴직 시작일:</label>
        <input type="date" class="leave-start">
        <label>휴직 종료일:</label>
        <input type="date" class="leave-end">
    `;
    document.getElementById("leave-periods").appendChild(leaveDiv);
});

// 계산 버튼 클릭 시 전체 경력 계산
document.getElementById("calculate").addEventListener("click", () => {
    // 기본 경력 기간 계산
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);

    if (!startDate || !endDate || startDate >= endDate) {
        alert("유효한 기본 경력 날짜를 입력하세요.");
        return;
    }

    let totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

    // 추가 경력 구간 계산
    const careerPeriods = document.querySelectorAll(".career-period");
    careerPeriods.forEach(period => {
        const periodStart = new Date(period.querySelector(".period-start").value);
        const periodEnd = new Date(period.querySelector(".period-end").value);

        if (periodStart && periodEnd && periodStart < periodEnd) {
            totalDays += (periodEnd - periodStart) / (1000 * 60 * 60 * 24);
        }
    });

    // 휴직 구간 계산
    const leavePeriods = document.querySelectorAll(".leave-period");
    let leaveDays = 0;
    leavePeriods.forEach(period => {
        const leaveStart = new Date(period.querySelector(".leave-start").value);
        const leaveEnd = new Date(period.querySelector(".leave-end").value);
        if (leaveStart && leaveEnd && leaveStart < leaveEnd) {
            leaveDays += (leaveEnd - leaveStart) / (1000 * 60 * 60 * 24);
        }
    });

    const adjustedDays = totalDays - leaveDays;

    // 결과 출력
    document.getElementById("result").innerHTML = `
        <p>총 경력 기간: ${Math.floor(adjustedDays / 365)}년 ${Math.floor((adjustedDays % 365) / 30)}개월 ${Math.floor((adjustedDays % 365) % 30)}일</p>
        <p>총 일수: ${adjustedDays}일</p>
    `;
});