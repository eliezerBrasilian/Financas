import React, {useEffect, useMemo, useState} from 'react';
import {StatusBar, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {BackgroundColor} from '../../classes/BackgroundColor';
import {DateTime} from '../../classes/DateTime';
import {ChartScreenOverlayView} from '../../components/ChartScreenOverlayView';
import {DropDownSelect} from '../../components/DropDownSelect';
import {ListViewBalances} from '../../components/ListViewBalances';
import {Top} from '../../components/Top';
import {useChartScreenContext} from '../../contexts/ChartScreenContext';
import {useUserContext} from '../../contexts/UserContext';
import {Category} from '../../enums/Category';
import {Collections} from '../../enums/Collections';
import {tags} from '../../enums/Tag';
import {Utils} from '../../utils/Utils';

function ChartScreen() {
  const {selectedChartScreenTag, handleChangeCurrentTag} =
    useChartScreenContext();
  const [dropdownListVisible, setVisibilityOfDropDownList] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(tags.REVENUES);
  const [bgColor, setBgColor] = useState(
    BackgroundColor.getBackgrouncColor(tags.REVENUE),
  );

  useMemo(() => {
    console.log(selectedChartScreenTag);
    if (selectedChartScreenTag == tags.EXPENSE) {
      setCurrentTitle(tags.EXPENSES);
    }
    if (selectedChartScreenTag == tags.RESERVATION) {
      setCurrentTitle(tags.RESERVATIONS);
    }
    if (selectedChartScreenTag == tags.REVENUE) {
      setCurrentTitle(tags.REVENUES);
    }

    setBgColor(BackgroundColor.getBackgrouncColor(selectedChartScreenTag));
  }, [selectedChartScreenTag]);

  const [total, setTotal] = useState(0);
  const [date, setDate] = useState(new Date());
  const {user} = useUserContext();
  const [homeTotal, setHomeTotal] = useState(0);
  const [lazerTotal, setLazerTotal] = useState(0);
  const [lancheTotal, setLancheTotal] = useState(0);
  const [trabalhoTotal, setTrabalhoTotal] = useState(0);
  const [investimentoTotal, setInvestimentoTotal] = useState(0);
  const [outrosTotal, setOutrosTotal] = useState(0);
  const [saudeTotal, setSaudeTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const uid = user?.uid;

  function loadRelatedBalance() {
    firestore()
      .collection(Collections.REGISTERS)
      .where('createdBy', '==', uid)
      .where('monthYear', '==', Utils.getMonthAndYear(date))
      .where('deleted', '==', false)
      .where('tag', '==', selectedChartScreenTag)
      .onSnapshot(querySnap => {
        var total = 0;
        var casa = 0;
        var lanche = 0;
        var lazer = 0;
        var trabalho = 0;
        var investimento = 0;
        var outros = 0;
        var saude = 0;

        querySnap.docs.forEach(i => {
          total += i.data().amount;

          if (i.data().category == Category.CASA) casa += i.data().amount;
          if (i.data().category == Category.LANCHE_FASTFOOD)
            lanche += i.data().amount;
          if (i.data().category == Category.LAZER) lazer += i.data().amount;
          if (i.data().category == Category.TRABALHO)
            trabalho += i.data().amount;
          if (i.data().category == Category.INVESTIMENTO)
            investimento += i.data().amount;
          if (i.data().category == Category.OUTROS) outros += i.data().amount;
          if (i.data().category == Category.SAUDE) saude += i.data().amount;
        });

        setTotal(total);
        setHomeTotal(casa);
        setTrabalhoTotal(trabalho);
        setLancheTotal(lanche);
        setLazerTotal(lazer);
        setInvestimentoTotal(investimento);
        setOutrosTotal(outros);
        setSaudeTotal(saude);
      });
  }

  function closeAllPopUps() {
    setVisibilityOfDropDownList(false);
  }

  function dropdownListOfBalance() {
    setVisibilityOfDropDownList(value => !value);
  }

  useEffect(() => {
    loadRelatedBalance();
  }, [selectedChartScreenTag, date]);

  var decrementMonth = () => {
    const thisDate = date;
    const newDate = new DateTime().decreaseMonth(thisDate);

    setDate(newDate);
  };

  var incrementMonth = () => {
    const thisDate = date;
    const newDate = new DateTime().increaseMonth(thisDate);
    setDate(newDate);
  };

  var handleClickOnListBalances = newTag => {
    setVisibilityOfDropDownList(false);

    if (newTag == tags.EXPENSE) {
      setCurrentTitle(tags.EXPENSES);
    }
    if (newTag == tags.RESERVATION) {
      setCurrentTitle(tags.RESERVATIONS);
    }
    if (newTag == tags.REVENUE) {
      setCurrentTitle(tags.REVENUES);
    }
    setBgColor(BackgroundColor.getBackgrouncColor(newTag));
    handleChangeCurrentTag(newTag);
  };

  return (
    <View
      style={{
        backgroundColor: bgColor,
        flex: 1,
      }}
      activeOpacity={1.0}
      onPress={closeAllPopUps}>
      <StatusBar backgroundColor={bgColor} barStyle={'light-content'} />

      <View style={{margin: 10}}>
        <DropDownSelect
          title={currentTitle}
          dropdownListOfBalance={dropdownListOfBalance}
        />
      </View>

      <Top amount={total} title={'Montante utilizado'} />

      <ChartScreenOverlayView
        date={date}
        incrementMonth={incrementMonth}
        decrementMonth={decrementMonth}
        loading={loading}
        casaTotal={homeTotal}
        lancheTotal={lancheTotal}
        lazerTotal={lazerTotal}
        trabalhoTotal={trabalhoTotal}
        investimentoTotal={investimentoTotal}
        outrosTotal={outrosTotal}
        saudeTotal={saudeTotal}
        montanteTotal={total}
      />

      {dropdownListVisible && (
        <ListViewBalances onClick={handleClickOnListBalances} />
      )}
    </View>
  );
}


export {ChartScreen};
