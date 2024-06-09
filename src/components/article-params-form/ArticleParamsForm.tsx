import { ArrowButton } from 'components/arrow-button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from '../separator';
import { Button } from 'components/button';
import { useState, useEffect, FormEvent, useRef } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	defaultArticle: ArticleStateType;
	setDefaultArticle: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultArticle,
	setDefaultArticle,
}: ArticleParamsFormProps) => {
	const [form, setForm] = useState(false);
	const [state, setState] = useState(defaultArticle);

	function closeClickForm(event: MouseEvent) {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setForm(false);
		}
	}

	useEffect(() => {
		if (!form) return;

		function closeForm(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setForm(false);
			}
		}

		document.addEventListener('keydown', closeForm);
		document.addEventListener('mousedown', closeClickForm);

		return () => {
			document.removeEventListener('keydown', closeForm);
			document.removeEventListener('mousedown', closeClickForm);
		};
	}, [form]);

	const ref = useRef<HTMLFormElement | null>(null);

	function addSettings(event: FormEvent) {
		event.preventDefault();
		setDefaultArticle(state);
	}

	function resetSettings() {
		setState(defaultArticleState);
		setDefaultArticle(defaultArticleState);
	}

	function toggleForm() {
		setForm((prevForm) => !prevForm);
	}
	return (
		<>
			<ArrowButton form={form} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: form })}>
				<form
					className={styles.form}
					onSubmit={addSettings}
					onReset={resetSettings}
					ref={ref}>
					<Text
						as='h1'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selected) =>
							setState({ ...state, fontFamilyOption: selected })
						}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={(selected) =>
							setState({ ...state, fontSizeOption: selected })
						}
						title='Размер шрифта'
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selected) => setState({ ...state, fontColor: selected })}
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selected) =>
							setState({ ...state, backgroundColor: selected })
						}
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selected) =>
							setState({ ...state, contentWidth: selected })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
