// 구현 계획
// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
// 2. IntersectionObserver를 사용해서 모든 섹션들을 관찰해야 한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
// 보여지는 섹션:
// - 다수의 섹션이 동시에 보여진다면, 가장 첫번째 섹션을 선택
// - 마지막 contact 섹션이 보여진다면, 그러면 가장 마지막 섹션을 선택
const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact',
  ]; //일일이 하나씩 가져오기보다 이렇게 배열로 가져오면 훨씬 코드가 짧아짐.
  const sections = sectionIds.map((id) => document.querySelector(id));
  //console.log(sections);
  const navItems = sectionIds.map((id) =>
    document.querySelector(`[href="${id}"]`)
  );
  //console.log(navItems);
  const visibleSections = sectionIds.map(() => false);
  let activeNavItem = navItems[0]

  const options = {
    rootMargin: '-20% 0px 0px 0px',
    threshold: [0, 0.98],
  };
  
  const observer = new IntersectionObserver(observerCallback, options);
  sections.forEach((section) => observer.observe(section));
  
  function observerCallback(entries) {
    let selectLastOne;
    entries.forEach((entry) => {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      visibleSections[index] = entry.isIntersecting; //노출여부
      selectLastOne =
        index === sectionIds.length - 1 &&
        entry.isIntersecting &&
        entry.intersectionRatio >= 0.95; //노출비율
    });
    console.log(visibleSections);
    console.log('무조건 라스트 섹션!!', selectLastOne);
  
    const navIndex = selectLastOne
      ? sectionIds.length - 1
      : findFirstIntersecting(visibleSections);
    
    selectNavItem(navIndex);
  }
  
  function findFirstIntersecting(intersections) {
    const index = intersections.indexOf(true);
    return index >= 0 ? index : 0;
  }

  function selectNavItem(index) {
    const navItem = navItems[index];
    if(!navItem) return;
    activeNavItem.classList.remove('active');
    activeNavItem = navItem
    activeNavItem.classList.add('active');
  }