package lottoHelper;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import lottoHelper.Numbers;
import org.eclipse.xtext.xbase.lib.CollectionLiterals;
import org.eclipse.xtext.xbase.lib.Conversions;
import org.eclipse.xtext.xbase.lib.Functions.Function1;
import org.eclipse.xtext.xbase.lib.InputOutput;
import org.eclipse.xtext.xbase.lib.IterableExtensions;
import org.eclipse.xtext.xbase.lib.ListExtensions;

@SuppressWarnings("all")
public class Main {
  public static void main(final String[] args) {
    final String input = ((Numbers.ours_7_5_2021 + Numbers.won_2020) + Numbers.won_2021);
    final Function1<String, String[]> _function = new Function1<String, String[]>() {
      public String[] apply(final String it) {
        return Main.processLine(it);
      }
    };
    final List<String[]> lines = ListExtensions.<String, String[]>map(((List<String>)Conversions.doWrapArray(input.split("\n"))), _function);
    final Function1<String[], List<Integer>> _function_1 = new Function1<String[], List<Integer>>() {
      public List<Integer> apply(final String[] it) {
        final Function1<String, Boolean> _function = new Function1<String, Boolean>() {
          public Boolean apply(final String it) {
            int _length = it.trim().length();
            return Boolean.valueOf((_length > 0));
          }
        };
        final Function1<String, Integer> _function_1 = new Function1<String, Integer>() {
          public Integer apply(final String it) {
            return Integer.valueOf(Integer.parseInt(it));
          }
        };
        return IterableExtensions.<Integer>sort(IterableExtensions.<String, Integer>map(IterableExtensions.<String>take(IterableExtensions.<String>filter(((Iterable<String>)Conversions.doWrapArray(it)), _function), 5), _function_1));
      }
    };
    final List<List<Integer>> finals = ListExtensions.<String[], List<Integer>>map(lines, _function_1);
    final Function1<List<Integer>, Integer> _function_2 = new Function1<List<Integer>, Integer>() {
      public Integer apply(final List<Integer> it) {
        return it.get(0);
      }
    };
    final Function1<List<Integer>, String> _function_3 = new Function1<List<Integer>, String>() {
      public String apply(final List<Integer> it) {
        return IterableExtensions.join(it, "_");
      }
    };
    final Consumer<String> _function_4 = new Consumer<String>() {
      public void accept(final String it) {
        InputOutput.<String>println(it);
      }
    };
    ListExtensions.<List<Integer>, String>map(IterableExtensions.<List<Integer>, Integer>sortBy(finals, _function_2), _function_3).forEach(_function_4);
    InputOutput.<Integer>println(Integer.valueOf(finals.size()));
  }
  
  public static String trimToSpace(final String input, final List<String> chs) {
    String _xblockexpression = null;
    {
      final ArrayList<String> newInput = CollectionLiterals.<String>newArrayList();
      newInput.add(input);
      final Consumer<String> _function = new Consumer<String>() {
        public void accept(final String ch) {
          String _replace = IterableExtensions.<String>last(newInput).replace(ch, " ");
          newInput.add(_replace);
        }
      };
      chs.forEach(_function);
      _xblockexpression = IterableExtensions.<String>last(newInput);
    }
    return _xblockexpression;
  }
  
  public static String[] processLine(final String s) {
    final String[] x = IterableExtensions.<String>last(((Iterable<String>)Conversions.doWrapArray(s.split(":")))).split(" ");
    return x;
  }
}
