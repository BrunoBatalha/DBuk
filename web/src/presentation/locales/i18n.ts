import i18n from 'i18next';
import ptBtrJson from 'presentation/locales/translations/pt-br.json';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
	lng: 'ptBr',
	resources: {
		ptBr: {
			translation: ptBtrJson
		}
	}
});
