import styles from "../../company.module.scss";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: id } = await params;
  return (
    <div className={styles.vacancyPage}>
      <div className={styles.vacancyInfo}>
        <div className={styles.infoMain}>
          <h1 className={styles.vacancyTitle}>Укротитель питонов</h1>
          <div className={styles.vacancyTime}>
            <div className={styles.timeContainer}>
              <img className={styles.timeIcon} src="/timer.svg" alt="timer icon" />
            </div>
            <p className={styles.vacancyTime}>1:20:00</p>
          </div>
          <div className={styles.vacancyMembers}>
            <div className={styles.membersContainer}>
              <img className={styles.membersIcon} src="/members.svg" alt="members icon" />
            </div>
            <p className={styles.vacancyMembers}>52</p>
          </div>
        </div>
        <div className={styles.positionContainer}>
          <p className={styles.position}>Senior</p>
        </div>
        <div className={styles.vacancyParameters}>
          <div className={styles.parameter}>
            <p className={styles.parameterTitle}>Требования</p>
            <div className={styles.parameterContent}>
              <p className={styles.contentText}>Должен мощно ловить питонов голыми руками, без варежек, без перчаток, без оборудования. + программировать на листочке на всех языках программирования, иметь личную машину Тьюринга в подвале своего личного котеджа в Крыму, говорить по китайски. В паспорте в графе имя должно стоять DeepSeek.</p>
            </div>
          </div>
          <div className={styles.parameter}>
            <p className={styles.parameterTitle}>Идеи задания</p>
            <div className={styles.parameterContent}>
              <p className={styles.contentText}>Первое задание - час двадцать бегать по кругу, громко и выразительно шипеть внушая ужас во всех близлежащих питонов, чтобы они знали, кто тут главный.
  Задание два - жонглировать питонами на протяжениями 10 минут. Минимальное количество снарядов - 10^e, за каждого последующего питона давать респект дикий.
  На посошок - разработать маленький сервис на FastAPI с 4 бд, нейронкой, фронтом тоже на питоне. Никакого html. На всё минут 10.</p>
            </div>
          </div>
          <div className={styles.parameter_long}>
            <p className={styles.parameterTitle}>Ваши задания</p>
            <div className={styles.parameterContent}>
              <p className={styles.contentText}>Я хочу пицыы...</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className={styles.vacancyBlockTitle}>Результаты участников:</h2>
      <div className={styles.vacancyResults}>

        <div className={styles.intervieweeCard}>
          <div className={styles.intervieweeInfo}>
            <p className={styles.intervieweeName}>Алексей Иванов</p>
            <p className={styles.intervieweeResume}>Резюме: <a className={styles.intervieweeResumeLink} href="#">https://drive.google.com/resume/alexey_ivanov.pdf</a></p>
          </div>
          <div className={styles.intervieweeStatContainer}>
            <div className={styles.intervieweeLogoContainer}>
              <img className={styles.intervieweeLogo} src="/timer.svg" alt="timer icon" />
            </div>
            <p className={styles.intervieweeStat}><b>Потрачено:</b> 1:19:54</p>
            <div className={styles.intervieweeSplit}></div>
            <p className={styles.intervieweeStat}><b>На задания потрачено соответственно:</b> 0:00:01, 1:09:53, 0:10:00</p>
            <div className={styles.intervieweeSplit}></div>
            <p className={styles.intervieweeStat}><b>Заданий выполнено:</b> 3</p>
            <div className={styles.intervieweeSplit}></div>
            <p className={styles.intervieweeStat}><b>Количество подозрительных копирований:</b> 3</p>
          </div>
          <div className={styles.intervieweeDivider}></div>
          <div className={styles.intervieweeResume}>
            <h3 className={styles.intervieweeTitle}>Сводка от ИИ:</h3>
            <p className={styles.intervieweeText}>Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna. Eget eu mattis gravida elit ac lacus volutpat ut aliquam. Quisque rutrum non ullamcorper diam. Parturient ultricies quis augue ut ullamcorper.</p>
          </div>
          <div className={styles.intervieweeNumbers}>
            <div className={styles.intervieweeLogoContainer}>
              <img className={styles.intervieweeLogo} src="/stat.svg" alt="statistic logo" />
            </div>
            <p className={styles.intervieweeStat}><b>Оценка чистоты кода:</b> 4/5</p>
            <div className={styles.intervieweeSplit}></div>
            <p className={styles.intervieweeStat}><b>Оценка понимания:</b> 3/5</p>
          </div>
          <div className={styles.intervieweeAssessment}>
            <h3 className={styles.intervieweeTitle}>Оценка результата:</h3>
            <p className={styles.intervieweeText}>Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna. Eget eu mattis gravida elit ac lacus volutpat ut aliquam. Quisque rutrum non ullamcorper diam. Parturient ultricies quis augue ut ullamcorper.</p>
          </div>
          <div className={styles.intervieweeLevel}>
            <div className={styles.intervieweeTitleContainer}>
              <div className={styles.intervieweeLogoContainer}>
                <img className={styles.intervieweeLogo} src="/assess.svg" alt="assessment icon" />
              </div>
              <h3 className={styles.intervieweeTitle}>Технический уровень: middle</h3>
            </div>
            <p className={styles.intervieweeText}>Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna. Eget eu mattis gravida elit ac lacus volutpat ut aliquam. Quisque rutrum non ullamcorper diam. Parturient ultricies quis augue ut ullamcorper.</p>
          </div>
          <div className={styles.intervieweeDivider}></div>
          <div className={styles.intervieweeStrengths}>
            <div className={styles.intervieweeTitleContainer}>
              <div className={styles.intervieweeLogoContainer}>
                <img className={styles.intervieweeLogo} src="/strength.svg" alt="strength icon"></img>
              </div>
              <h3 className={styles.intervieweeTitle}>Сильные стороны</h3>
            </div>
            <p className={styles.intervieweeText}>Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna. Eget eu mattis gravida elit ac lacus volutpat ut aliquam. Quisque rutrum non ullamcorper diam. Parturient ultricies quis augue ut ullamcorper.</p>
          </div>
          <div className={styles.intervieweeWeaknesses}>
            <div className={styles.intervieweeTitleContainer}>
              <div className={styles.intervieweeLogoContainer}>
                <img className={styles.intervieweeLogo} src="/weakness.svg" alt="weakness icon"></img>
              </div>
              <h3 className={styles.intervieweeTitle}>Слабые стороны</h3>
            </div>
            <p className={styles.intervieweeText}>Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna. Eget eu mattis gravida elit ac lacus volutpat ut aliquam. Quisque rutrum non ullamcorper diam. Parturient ultricies quis augue ut ullamcorper.</p>
          </div>
          <div className={styles.intervieweeCheats}>
            <div className={styles.intervieweeTitleContainer}>
              <div className={styles.intervieweeLogoContainer}>
                <img className={styles.intervieweeLogo} src="/cheat.svg" alt="cheat icon"></img>
              </div>
              <h3 className={styles.intervieweeTitle}>Оценка читерства:</h3>
            </div>
            <p className={styles.intervieweeText}>Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna. Eget eu mattis gravida elit ac lacus volutpat ut aliquam. Quisque rutrum non ullamcorper diam. Parturient ultricies quis augue ut ullamcorper.</p>
          </div>
          <div className={styles.intervieweeVerdict}>
            <div className={styles.intervieweeLogoContainer}>
              <img className={styles.intervieweeLogo} src="/idea.svg" alt="idea icon" />
            </div>
            <div className={styles.intervieweeStatResult}>
              <b>Итоговая оценка уровня: </b>
              <p className={styles.activeMarking}>middle</p>
            </div>
            <div className={styles.intervieweeSplit}></div>
            <div className={styles.intervieweeStatResult}>
              <b>Рекомендация: </b>
              <p className={styles.activeMarking}>казнить</p>
            </div>
          </div>
        </div>

        <div className={styles.intervieweeCard}>
          <div className={styles.intervieweeInfo}>
            <p className={styles.intervieweeName}>Алексей Иванов</p>
            <p className={styles.intervieweeResume}>Резюме: <a className={styles.intervieweeResumeLink} href="#">https://drive.google.com/resume/alexey_ivanov.pdf</a></p>
          </div>
          <div className={styles.intervieweeStatContainer}>
            <div className={styles.intervieweeLogoContainer}>
              <img className={styles.intervieweeLogo} src="/timer.svg" alt="timer icon" />
            </div>
            <p className={styles.intervieweeStat}><b>Потрачено:</b> 1:19:54</p>
            <div className={styles.intervieweeSplit}></div>
            <p className={styles.intervieweeStat}><b>На задания потрачено соответственно:</b> 0:00:01, 1:09:53, 0:10:00</p>
            <div className={styles.intervieweeSplit}></div>
            <p className={styles.intervieweeStat}><b>Заданий выполнено:</b> 3</p>
            <div className={styles.intervieweeSplit}></div>
            <p className={styles.intervieweeStat}><b>Количество подозрительных копирований:</b> 3</p>
          </div>
          <div className={styles.intervieweeDivider}></div>
          <div className={styles.intervieweeResume}>
            <h3 className={styles.intervieweeTitle}>Сводка от ИИ:</h3>
            <p className={styles.intervieweeText}>Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna. Eget eu mattis gravida elit ac lacus volutpat ut aliquam. Quisque rutrum non ullamcorper diam. Parturient ultricies quis augue ut ullamcorper.</p>
          </div>
          <div className={styles.intervieweeNumbers}>
            <div className={styles.intervieweeLogoContainer}>
              <img className={styles.intervieweeLogo} src="/stat.svg" alt="statistic logo" />
            </div>
            <p className={styles.intervieweeStat}><b>Оценка чистоты кода:</b> 4/5</p>
            <div className={styles.intervieweeSplit}></div>
            <p className={styles.intervieweeStat}><b>Оценка понимания:</b> 3/5</p>
          </div>
          <div className={styles.intervieweeAssessment}>
            <h3 className={styles.intervieweeTitle}>Оценка результата:</h3>
            <p className={styles.intervieweeText}>Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna. Eget eu mattis gravida elit ac lacus volutpat ut aliquam. Quisque rutrum non ullamcorper diam. Parturient ultricies quis augue ut ullamcorper.</p>
          </div>
          <div className={styles.intervieweeLevel}>
            <div className={styles.intervieweeTitleContainer}>
              <div className={styles.intervieweeLogoContainer}>
                <img className={styles.intervieweeLogo} src="/assess.svg" alt="assessment icon" />
              </div>
              <h3 className={styles.intervieweeTitle}>Технический уровень: middle</h3>
            </div>
            <p className={styles.intervieweeText}>Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna. Eget eu mattis gravida elit ac lacus volutpat ut aliquam. Quisque rutrum non ullamcorper diam. Parturient ultricies quis augue ut ullamcorper.</p>
          </div>
          <div className={styles.intervieweeDivider}></div>
          <div className={styles.intervieweeStrengths}>
            <div className={styles.intervieweeTitleContainer}>
              <div className={styles.intervieweeLogoContainer}>
                <img className={styles.intervieweeLogo} src="/strength.svg" alt="strength icon"></img>
              </div>
              <h3 className={styles.intervieweeTitle}>Сильные стороны</h3>
            </div>
            <p className={styles.intervieweeText}>Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna. Eget eu mattis gravida elit ac lacus volutpat ut aliquam. Quisque rutrum non ullamcorper diam. Parturient ultricies quis augue ut ullamcorper.</p>
          </div>
          <div className={styles.intervieweeWeaknesses}>
            <div className={styles.intervieweeTitleContainer}>
              <div className={styles.intervieweeLogoContainer}>
                <img className={styles.intervieweeLogo} src="/weakness.svg" alt="weakness icon"></img>
              </div>
              <h3 className={styles.intervieweeTitle}>Слабые стороны</h3>
            </div>
            <p className={styles.intervieweeText}>Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna. Eget eu mattis gravida elit ac lacus volutpat ut aliquam. Quisque rutrum non ullamcorper diam. Parturient ultricies quis augue ut ullamcorper.</p>
          </div>
          <div className={styles.intervieweeCheats}>
            <div className={styles.intervieweeTitleContainer}>
              <div className={styles.intervieweeLogoContainer}>
                <img className={styles.intervieweeLogo} src="/cheat.svg" alt="cheat icon"></img>
              </div>
              <h3 className={styles.intervieweeTitle}>Оценка читерства:</h3>
            </div>
            <p className={styles.intervieweeText}>Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna. Eget eu mattis gravida elit ac lacus volutpat ut aliquam. Quisque rutrum non ullamcorper diam. Parturient ultricies quis augue ut ullamcorper.</p>
          </div>
          <div className={styles.intervieweeVerdict}>
            <div className={styles.intervieweeLogoContainer}>
              <img className={styles.intervieweeLogo} src="/idea.svg" alt="idea icon" />
            </div>
            <div className={styles.intervieweeStatResult}>
              <b>Итоговая оценка уровня: </b>
              <p className={styles.activeMarking}>middle</p>
            </div>
            <div className={styles.intervieweeSplit}></div>
            <div className={styles.intervieweeStatResult}>
              <b>Рекомендация: </b>
              <p className={styles.activeMarking}>казнить</p>
            </div>
          </div>
        </div>

      </div>


    </div>
  );
}
