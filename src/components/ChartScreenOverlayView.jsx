import React, {useMemo, useState} from 'react';
import {ScrollView, View} from 'react-native';

import {BlurView} from '@react-native-community/blur';
import {PieChart} from 'react-native-gifted-charts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../assets/colors/colors';
import {useUserContext} from '../contexts/UserContext';
import {Category} from '../enums/Category';
import {Utils} from '../utils/Utils';
import {BluerPremium} from './BluerPremium';
import {HeaderOfOverlayView} from './HeaderOfOverlayView';
import {Loading} from './Loading';
import {PiLegend} from './PieLegend';
import {TextContent} from './TextContent';

function ChartScreenOverlayView({
  date,
  incrementMonth,
  decrementMonth,
  loading,
  casaTotal = 0,
  lancheTotal = 0,
  lazerTotal = 0,
  trabalhoTotal = 0,
  investimentoTotal = 0,
  outrosTotal = 0,
  saudeTotal = 0,
  montanteTotal = 0,
}) {
  const [casaTotal_, setCasaTotal] = useState(casaTotal);
  const [lancheTotal_, setLancheTotal] = useState(lancheTotal);
  const [lazerTotal_, setLazerTotal] = useState(lazerTotal);
  const [trabalhoTotal_, setTrabalhoTotal] = useState(trabalhoTotal);
  const [investimentoTotal_, setInvestimentoTotal] =
    useState(investimentoTotal);
  const [outrosTotal_, setOutrosTotal] = useState(outrosTotal);
  const [saudeTotal_, setSaudeTotal] = useState(saudeTotal);

  const [casaPorcentagem, setCasaPorcentagem] = useState(0);
  const [lanchePorcentagem, setLanchePorcentagem] = useState(0);
  const [lazerPorcentagem, setLazerPorcentagem] = useState(0);
  const [trabalhoPorcentagem, setTrabalhoPorcentagem] = useState(0);
  const [investimentoPorcentagem, setInvestimentoPorcentagem] = useState(0);
  const [outrosPorcentagem, setOutrosPorcentagem] = useState(0);
  const [saudePorcentagem, setSaudePorcentagem] = useState(0);

  useMemo(() => {
    setCasaTotal(casaTotal);
    var montanteTotalCopia = montanteTotal;
    var porcentagem = 0;

    if (montanteTotalCopia > 0) {
      porcentagem = casaTotal * (100 / montanteTotal);
      setCasaPorcentagem(Utils.arredondaNumero(porcentagem));
    } else {
      setCasaPorcentagem(0);
    }
  }, [casaTotal, montanteTotal]);

  useMemo(() => {
    setLancheTotal(lancheTotal);

    var montanteTotalCopia = montanteTotal;
    var porcentagem = 0;
    if (montanteTotalCopia > 0) {
      porcentagem = lancheTotal * (100 / montanteTotal);
      setLanchePorcentagem(Utils.arredondaNumero(porcentagem));
    } else {
      setLanchePorcentagem(0);
    }
  }, [lancheTotal, montanteTotal]);

  useMemo(() => {
    setLazerTotal(lazerTotal);

    var montanteTotalCopia = montanteTotal;
    var porcentagem = 0;
    if (montanteTotalCopia > 0) {
      porcentagem = lazerTotal * (100 / montanteTotal);
      setLazerPorcentagem(Utils.arredondaNumero(porcentagem));
    } else {
      setLazerPorcentagem(0);
    }
  }, [lazerTotal, montanteTotal]);

  useMemo(() => {
    setTrabalhoTotal(trabalhoTotal);

    var montanteTotalCopia = montanteTotal;
    var porcentagem = 0;
    if (montanteTotalCopia > 0) {
      porcentagem = trabalhoTotal * (100 / montanteTotal);
      setTrabalhoPorcentagem(Utils.arredondaNumero(porcentagem));
    } else {
      setTrabalhoPorcentagem(0);
    }
  }, [trabalhoTotal, montanteTotal]);

  useMemo(() => {
    setInvestimentoTotal(investimentoTotal);

    var montanteTotalCopia = montanteTotal;
    var porcentagem = 0;
    if (montanteTotalCopia > 0) {
      porcentagem = investimentoTotal * (100 / montanteTotal);
      setInvestimentoPorcentagem(Utils.arredondaNumero(porcentagem));
    } else {
      setInvestimentoPorcentagem(0);
    }
  }, [investimentoTotal, montanteTotal]);

  useMemo(() => {
    setOutrosTotal(outrosTotal);

    var montanteTotalCopia = montanteTotal;
    var porcentagem = 0;
    if (montanteTotalCopia > 0) {
      porcentagem = outrosTotal * (100 / montanteTotal);
      setOutrosPorcentagem(Utils.arredondaNumero(porcentagem));
    } else {
      setOutrosPorcentagem(0);
    }
  }, [outrosTotal, montanteTotal]);

  useMemo(() => {
    setSaudeTotal(saudeTotal);

    var montanteTotalCopia = montanteTotal;
    var porcentagem = 0;
    if (montanteTotalCopia > 0) {
      porcentagem = saudeTotal * (100 / montanteTotal);
      setSaudePorcentagem(Utils.arredondaNumero(porcentagem));
    } else {
      setSaudePorcentagem(0);
    }
  }, [saudeTotal, montanteTotal]);

  const pieData = [
    {
      value: casaTotal,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
      focused: true,
    },
    {
      value: lancheTotal,
      color: '#ae36c9',
      gradientCenterColor: '#e93bdd',
    },
    {
      value: lazerTotal,
      color: '#93FCF8',
      gradientCenterColor: '#3BE9DE',
    },
    {
      value: trabalhoTotal,
      color: '#BDB2FA',
      gradientCenterColor: '#8F80F3',
    },
    {
      value: investimentoTotal,
      color: '#FFA5BA',
      gradientCenterColor: '#FF7F97',
    },
    {
      value: outrosTotal,
      color: '#dee',
      gradientCenterColor: '#d9f3f3',
    },
    {
      value: saudeTotal,
      color: '#1bce15',
      gradientCenterColor: '#148525',
    },
  ];

  function LegendItems() {
    return (
      <View style={{rowGap: 5}}>
        <PiLegend
          text={Category.CASA}
          amount={casaPorcentagem}
          dotColor={'#009FFF'}
        />
        <PiLegend
          text={Category.LANCHE_FASTFOOD}
          amount={Utils.arredondaNumero(lanchePorcentagem)}
          dotColor={'#ae36c9'}
        />
        <PiLegend
          text={Category.LAZER}
          amount={Utils.arredondaNumero(lazerPorcentagem)}
          dotColor={'#93FCF8'}
        />
        <PiLegend
          text={Category.TRABALHO}
          amount={Utils.arredondaNumero(trabalhoPorcentagem)}
          dotColor={'#BDB2FA'}
        />
        <PiLegend
          text={Category.INVESTIMENTO}
          amount={Utils.arredondaNumero(investimentoPorcentagem)}
          dotColor={'#FFA5BA'}
        />
        <PiLegend
          text={Category.OUTROS}
          amount={Utils.arredondaNumero(outrosPorcentagem)}
          dotColor={'#dee'}
        />
        <PiLegend
          text={Category.SAUDE}
          amount={Utils.arredondaNumero(saudePorcentagem)}
          dotColor={'#1bce15'}
        />
      </View>
    );
  }

  function TextItem({text, amount, iconName}) {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 15,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', columnGap: 5}}>
          <AntDesign name={iconName} color={'#000'} size={17} />
          <TextContent>{text}</TextContent>
        </View>

        <TextContent>{Utils.getBrazilianCurrency(amount)}</TextContent>
      </View>
    );
  }

  function MaterialIconTextItem({text, amount, iconName}) {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 15,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', columnGap: 5}}>
          <MaterialIcon name={iconName} color={'#000'} size={17} />
          <TextContent>{text}</TextContent>
        </View>

        <TextContent>{Utils.getBrazilianCurrency(amount)}</TextContent>
      </View>
    );
  }

  const {isPremium} = useUserContext();

  return (
    <View
      style={{
        backgroundColor: colors.background_home,
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
      }}>
      <HeaderOfOverlayView
        date={date}
        incrementMonth={incrementMonth}
        decrementMonth={decrementMonth}
      />

      <ScrollView style={{flex: 1, width: '100%'}}>
        <View>
          {!isPremium && (
            <BlurView
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2,
              }}
              blurAmount={9}
              //  overlayColor="transparent"
              blurType="xlight"
            />
          )}
          {!isPremium && <BluerPremium />}

          <View
            style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
            {(casaTotal_ > 0 ||
              lancheTotal_ > 0 ||
              lazerTotal_ > 0 ||
              trabalhoTotal_ > 0 ||
              investimentoTotal_ > 0 ||
              outrosTotal_ > 0 ||
              saudeTotal_ > 0) && (
              <PieChartContainer>
                <PieChart
                  data={pieData}
                  donut
                  showGradient
                  sectionAutoFocus
                  radius={90}
                  innerRadius={60}
                  innerCircleColor={'#232B5D'}
                  centerLabelComponent={() => {
                    return (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TextContent
                          style={{
                            fontSize: 22,
                            color: 'white',
                            fontWeight: 'bold',
                          }}>
                          ...
                        </TextContent>
                        <TextContent fontSize={14} color={'white'}>
                          I finanças
                        </TextContent>
                      </View>
                    );
                  }}
                />

                <View style={{marginHorizontal: 20, marginTop: 20}}>
                  {loading ? <Loading /> : <LegendItems />}
                </View>
              </PieChartContainer>
            )}

            <View
              style={{
                marginTop: 20,
                rowGap: 8,
                marginBottom: 20,
              }}>
              <TextItem
                text={Category.CASA}
                amount={casaTotal}
                iconName={'home'}
              />
              <MaterialIconTextItem
                text={Category.LANCHE_FASTFOOD}
                amount={lancheTotal}
                iconName={'fastfood'}
              />
              <TextItem
                text={Category.LAZER}
                amount={lazerTotal}
                iconName={'Trophy'}
              />
              <TextItem
                text={Category.TRABALHO}
                amount={trabalhoTotal}
                iconName={'tool'}
              />
              <TextItem
                text={Category.INVESTIMENTO}
                amount={investimentoTotal}
                iconName={'barchart'}
              />
              <TextItem
                text={Category.OUTROS}
                amount={outrosTotal_}
                iconName={'smileo'}
              />
              <MaterialIconTextItem
                text={Category.SAUDE}
                amount={saudeTotal_}
                iconName={'health-and-safety'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function PieChartContainer({children}) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 15,
        borderRadius: 15,
      }}>
      {children}
    </View>
  );
}
export {ChartScreenOverlayView};
